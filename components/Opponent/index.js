import { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../../redux/actions';

import style from './styles.scss';
import { KILL_ANIME_DURATION } from '../../utils/arenaUtils';

const Opponent = ({
  // Actions
  killOpponent,

  // State
  arena: { opponent },
}) => {
  const { name, health, maxHealth, slug } = opponent;
  const killed = health <= 0;

  useEffect(() => {
    if (killed) {
      setTimeout(() => killOpponent(opponent), KILL_ANIME_DURATION * 1000);
    }
  }, [killed]);

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img
          src={`${slug}.png`}
          alt={name}
          className={classNames(style.image, {[style.shrink]: killed})}
        />
      </div>
      <h3>{name}</h3>
      <p>{health.toFixed(2)} / {maxHealth}</p>
    </div>
  );
};

export default connect(
  state => state,
  actions,
)(Opponent);
