import { connect } from 'react-redux';
import actions from '../../redux/actions';
import classNames from 'classnames';

import style from './styles.scss';

import ProgressBar from '../ProgressBar';
import * as allSkills from '../../redux/skills';
import { activateSkill } from '../../utils/characterUtils';

const Skill = connect(
  state => state,
  actions,
)(({
  // Actions
  activateSkill,
  purchaseSkill,

  // State
  character: { 
    activeSkills,
    skillProficiencies,
    inventory: { gold },
  },

  // Props
  id,
}) => {
  const proficiency = skillProficiencies[id];
  const skill = allSkills[id];
  const active = activeSkills.indexOf(id) >= 0;

  function handleClickActivate() {
    proficiency && activateSkill(id);
  }

  function handleClickPurchase() {
    purchaseSkill(skill.id);
  }

  function renderPurchaseIf(affordable) {
    return affordable && !proficiency ? (
      <a
        onClick={handleClickPurchase}
        className={style.purchaseLink}
      >
        Purchase
      </a>
    ) : null;
  }

  function renderProgress({ current, base, next, level }) {
    const progress = (current - base) / (next - base) * 100;

    return (
      <div className={style.skillProgress}>
        <span className={style.levelIndicator}>{level}</span>
        <ProgressBar progress={progress} />
      </div>
    );
  }

  return (
    <div
      className={classNames(style.skill, {[style.active]: active, [style.purchased]: proficiency})}
      onClick={handleClickActivate}
    >
      <div className={style.skillTitle}>{skill.title}</div>
      <div className={style.skillBody}>
        {renderPurchaseIf(gold >= skill.baseCost)}
        {proficiency ? (
        <div>
          <div style={{fontSize: '0.7rem'}}>Dmg: {skill.dmgFn(skill.baseDmg, proficiency.level)}</div>
          <div style={{fontSize: '0.7rem'}}>DPS: {skill.dpsFn(skill.baseDPS, proficiency.level)}</div>
        </div>
      ): null}
      </div>
      {proficiency ? renderProgress(proficiency) : null}
    </div>
  );
});

const SkillTree = ({
  // Actions


  // State
  character: { maxActiveSkills }
}) => {
  return (
    <div className={style.container}>
      <p>Max no. of active Skills: {maxActiveSkills}</p>
      <div className={style.tier}>
        <Skill id="charge" />
        <Skill id="threaten" />
      </div>
    </div>
  );
};

export default connect(
  state => state,
  actions,
)(SkillTree);
