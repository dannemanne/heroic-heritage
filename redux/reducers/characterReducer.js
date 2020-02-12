import { registerReducer } from '../../utils/reducerUtils';
import { KILL_ANIME_DURATION } from '../../utils/arenaUtils';
import { activateSkill, trainSkills, calculateDamage } from '../../utils/characterUtils';

import { ACTIVATE_SKILL, KILL_OPPONENT, PURCHASE_SKILL, IDLE_OPPONENT } from '../types';
import * as allSkills from '../skills';

const BASE_DMG = 1;
const BASE_DPS = 0;

const initialState = {
  affinity: 'none',
  name: 'DanneManne',
  gender: 'Male',
  father: null,
  mother: null,
  fame: 0,
  inventory: { gold: 0 },
  profession: 'Fighter',
  activeSkills: [],
  maxActiveSkills: 1,
  skillProficiencies: {
    //charge: { level: 1, current: 0, base: 0, next: 20 },
    // charge:       { id: 'charge',   title: 'Charge',    cost: 10, tier: 1, level: 0, xp: { current: 0, base: 0, next: 100 } },
    // threaten:     { id: 'threaten', title: 'Threaten',  cost: 10, tier: 1, level: 0, xp: { current: 0, base: 0, next: 100 } },
  },
  dps: BASE_DPS,
  dmg: BASE_DMG,
};

export default registerReducer(initialState, {
  [KILL_OPPONENT]: ({ fame, inventory, skillProficiencies, activeSkills }, { fameReward, goldReward }) => {
    const { gold } = inventory;
    const newFame = fame + fameReward;
    const newGold = gold + goldReward;
    
    const newSkillProficiencies = trainSkills(skillProficiencies, activeSkills, 1);
    const [dmg, dps] = calculateDamage(newSkillProficiencies, activeSkills, BASE_DMG, BASE_DPS);
    
    return {
      fame: newFame,
      inventory: Object.assign({}, inventory, { gold: newGold }),
      skillProficiencies: newSkillProficiencies,
      dmg,
      dps,
    };
  },

  [IDLE_OPPONENT]: ({ fame, inventory, skillProficiencies, activeSkills }, { dps, duration, opponent }) => {
    const killDuration = opponent.maxHealth / dps;
    const cycleDuration = killDuration + KILL_ANIME_DURATION;
    
    if (cycleDuration < duration) {
      const noOfKills = parseInt(duration / cycleDuration);
      const newSkillProficiencies = trainSkills(skillProficiencies, activeSkills, noOfKills);

      return {
        fame: fame + opponent.fame * noOfKills,
        inventory: Object.assign({}, inventory, { gold: opponent.gold * noOfKills }),
        skillProficiencies: newSkillProficiencies,
      };
    }
  },

  [PURCHASE_SKILL]: ({ skillProficiencies, inventory, activeSkills, maxActiveSkills }, { skillId }) => {
    const skill = allSkills[skillId];
    const newGold = inventory.gold - skill.baseCost;

    const newSkillProficiencies = Object.assign({}, skillProficiencies,{
      [skillId]: { level: 1, current: 0, base: 0, next: skill.xpFn(skill.baseXP, 1) }
    });

    const newActiveSkills = activateSkill(skillId, activeSkills, maxActiveSkills);
    const [dmg, dps] = calculateDamage(newSkillProficiencies, newActiveSkills, BASE_DMG, BASE_DPS);

    return {
      inventory: Object.assign({}, inventory, { gold: newGold }),
      skillProficiencies: newSkillProficiencies,
      activeSkills: newActiveSkills,
      dmg,
      dps,
    };
  },

  [ACTIVATE_SKILL]: ({ skillProficiencies, activeSkills, maxActiveSkills }, { skillId }) => {
    const newActiveSkills = activateSkill(skillId, activeSkills, maxActiveSkills);
    const [dmg, dps] = calculateDamage(skillProficiencies, newActiveSkills, BASE_DMG, BASE_DPS);

    return {
      activeSkills: newActiveSkills,
      dmg,
      dps,
    }
  },
});
