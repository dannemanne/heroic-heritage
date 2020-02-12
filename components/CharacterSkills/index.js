import { connect } from 'react-redux';
import actions from '../../redux/actions';

import SkillTree from '../SkillTree';

import style from './styles.scss';

const CharacterSkills = ({
  character
}) => {

  return (
    <div className={style.container}>
      <SkillTree />
    </div>
  );
};

export default connect(
  state => state,
  actions,
)(CharacterSkills);
