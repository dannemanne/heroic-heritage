import { registerReducer } from '../../utils/reducerUtils';

import { ATTACK_OPPONENT, KILL_OPPONENT, NEW_OPPONENT, IDLE_OPPONENT } from '../types';

const initialState = {
  opponent: null,
  requestedChallengeRating: 1,
};

export default registerReducer(initialState, {
  [ATTACK_OPPONENT]: ({ opponent }, { dmg }) => {
    if (!opponent) return null;

    return { opponent: Object.assign({}, opponent, { health: opponent.health - dmg }) };
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
