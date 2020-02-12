import {
  ATTACK_OPPONENT,
  IDLE_OPPONENT,
  KILL_OPPONENT,
  NEW_OPPONENT,
} from '../types';

import { createOpponent } from '../../utils/arenaUtils';

export const attackOpponent = (dmg) => ({
  type: ATTACK_OPPONENT,
  dmg,
});

export const idleOpponent = ({dps, duration, opponent }) => ({
  type: IDLE_OPPONENT,
  dps,
  duration,
  opponent,
});

export const newOpponent = (challengeRating) => ({
  type: NEW_OPPONENT,
  newOpponent: createOpponent(challengeRating),
  challengeRating,
});

export const killOpponent = ({ challengeRating, gold, fame }) => ({
  type: KILL_OPPONENT,
  goldReward: gold,
  fameReward: fame,
});