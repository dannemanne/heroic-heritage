import { registerReducer } from '../../utils/reducerUtils';

import { ATTACK_OPPONENT, KILL_OPPONENT, NEW_OPPONENT, IDLE_OPPONENT } from '../types';

const initialState = {
  opponent: null,
  requestedChallengeRating: 1,
  clickCombo: [],
};

export default registerReducer(initialState, {
  [ATTACK_OPPONENT]: ({ opponent, clickCombo }, { dmg }) => {
    if (!opponent) return null;

    return {
      opponent: opponent ? Object.assign({}, opponent, { health: opponent.health - dmg }) : null,
      clickCombo: processClick(clickCombo),
    };
  },

  [IDLE_OPPONENT]: ({ opponent }, { dps, duration }) => {
    if (!opponent) return null;

    const dmg = Math.min(opponent.health, dps * duration);
    return { opponent: Object.assign({}, opponent, { health: opponent.health - dmg }) };
  },

  [NEW_OPPONENT]: ({ }, { newOpponent, challengeRating }) => {
    return { opponent: newOpponent, requestedChallengeRating: challengeRating };
  },

  [KILL_OPPONENT]: ({ }, {}) => {
    return { opponent: null };
  },
});

function processClick(clickCombo) {
  const previousClickTimestamp = clickCombo.slice(-1);
  const currentClickTimestamp = new Date().getTime();

  // Keep combo going if less than 2 seconds from previous click. Otherwise reset
  if (previousClickTimestamp && currentClickTimestamp - previousClickTimestamp < 2000) {
    return [...clickCombo, currentClickTimestamp];
  } else {
    return [currentClickTimestamp];
  }
}
