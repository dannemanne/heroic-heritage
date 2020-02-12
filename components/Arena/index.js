import { useEffect } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import style from './styles.scss';

import Opponent from '../Opponent';
import { killOpponent } from '../../redux/actions/arenaActions';
import { useAnimationFrame, KILL_ANIME_DURATION } from '../../utils/arenaUtils';

const Arena = ({
  // Actions
  attackOpponent,
  idleOpponent,
  newOpponent,
  killOpponent,

  // State
  arena: { opponent, requestedChallengeRating },
  character: { dmg, dps },
}) => {
  
  useEffect(() => {
    if (!opponent) {
      newOpponent(requestedChallengeRating);
    }
  }, [opponent]);

  function handleClick(evt) {
    attackOpponent(dmg);
  }

  useAnimationFrame(timeDiffMilli => 
    idleOpponent({ dps, duration: timeDiffMilli * 0.001, opponent })
  );

  return (
    <div
      className={style.container}
      onClick={handleClick}
    >
      <div className={style.land}>
        <div className={style.tile}>
          
        </div>
      </div>
      {opponent ? <Opponent /> : <p>No opponent!</p>}
    </div>
  );
};

export default connect(
  state => state,
  actions,
)(Arena);
