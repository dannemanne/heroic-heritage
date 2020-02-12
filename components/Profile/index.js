import { connect } from 'react-redux';
import actions from '../../redux/actions';

import style from './styles.scss';

const Profile = ({
  character: {
    fame,
    inventory: { gold },
    dmg,
    dps,
  },
}) => {

  return (
    <div className={style.container}>
      <div className={style.profile}>
        <i className={`fa fa-user-secret`} />
      </div>
      <div className={style.fame}>
        <i className={`fa fa-smile ${style.fa} ${style.faFame}`} />
        {fame}
      </div>
      <div className={style.gold}>
        <i className={`fa fa-ring ${style.fa} ${style.faRing}`} />
        {gold}
      </div>
      <div  className={style.clickDmg}>
        <i className={`fa fa-hand-rock ${style.fa} ${style.faHand}`} />
        {dmg}
      </div>

      <div className={style.autoDmg}>
        <i className={`fa fa-clock ${style.fa} ${style.faClock}`} />
        {dps}
      </div>
    </div>
  );
};

export default connect(
  state => state,
  actions,
)(Profile);
