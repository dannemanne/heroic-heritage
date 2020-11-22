import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import actions from '../../redux/actions';

import style from './styles.scss';
import { KILL_ANIME_DURATION } from '../../utils/arenaUtils';

const Opponent = ({
  // Actions
  killOpponent,

  // State
  arena: { opponent, clickCombo },
}) => {
  const { name, health, maxHealth, slug } = opponent;
  const killed = health <= 0;
  const [hit, setHit] = useState(false);

  useEffect(() => {
    if (killed) {
      setTimeout(() => killOpponent(opponent), KILL_ANIME_DURATION * 1000);
    }
  }, [killed]);

  useEffect(() => {
    if (clickCombo.length > 0) {
      setHit(false);
      setTimeout(() => setHit(true), 10);
      setTimeout(() => setHit(false), 100);
    }
  }, [clickCombo]);

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img
          src={`${slug}.png`}
          alt={name}
          className={classNames(style.image, {[style.shrink]: killed, [style.hit]: hit})}
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
