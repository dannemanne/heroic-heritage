import * as allSkills from '../redux/skills';

export function activateSkill(skillId, activeSkills, maxActiveSkills) {
  if (maxActiveSkills < activeSkills.length + 1) {
    return activeSkills.slice(1).concat(skillId);
  } else {
    return activeSkills.concat(skillId);
  }
}

function train(skillProficiency, skill, xp) {
  const { current, next, level } = skillProficiency;
  const newXP = current + xp;

  if (newXP >= next) {
    const remainingXP = newXP - next;
    const newNext = next + skill.xpFn(skill.baseXP, level+1);
    return train(Object.assign({}, skillProficiency, { level: level+1, current: next, base: next, next: newNext }), skill, remainingXP)
  } else {
    return Object.assign({}, skillProficiency, { current: newXP });
  }
}

export function trainSkills(skillProficiencies, activeSkills, xp) {
  return activeSkills.reduce((sp, active) => {
    const skillProficiency = sp[active];
    const skill = allSkills[active];

    return Object.assign({}, sp, { [active]: train(skillProficiency, skill, xp) });
  }, skillProficiencies);
}

export function calculateDamage(skillProficiencies, activeSkills, dmg, dps) {
  return activeSkills.reduce(([dmg, dps], activeSkill) => {
    const skill = allSkills[activeSkill];
    const { level } = skillProficiencies[activeSkill];

    return [
      dmg + skill.dmgFn(skill.baseDmg, level),
      dps + skill.dpsFn(skill.baseDPS, level),
    ]
  }, [dmg, dps]);
}
