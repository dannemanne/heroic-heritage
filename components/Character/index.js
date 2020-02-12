import { useState } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import CharacterSkills from '../CharacterSkills';

import style from './styles.scss';

const TAB_SKILLS = 'TAB_SKILLS'

const Character = ({
  character: { level, xp },
}) => {
  const [activeTab, setActiveTab] = useState(TAB_SKILLS);

  const nextLevel = level + 1;
  const baseLevelXP = (level^2+level)/2*100-(level*100)
  const newLevelXP = (nextLevel^2+nextLevel)/2*100-(nextLevel*100)

  const xpProgress = xp - baseLevelXP;
  const xpGoal = newLevelXP - baseLevelXP;

  const tabComponents = {
    [TAB_SKILLS]: CharacterSkills,
  }

  const TabContentComponent = tabComponents[activeTab];

  return (
    <div className={style.container}>
      <ul className={style.tabContainer}>
        <li className={activeTab === TAB_SKILLS && style.activeTab}>Skills</li>
      </ul>
      <div className={style.tabContentContainer}>
        <TabContentComponent />
      </div>
    </div>
  );
};
// <p>XP: {xp} - {parseInt(100 * (xp - baseLevelXP) / (newLevelXP - baseLevelXP))}%</p>
export default connect(
  state => state,
  actions,
)(Character);
