import { useRef, useLayoutEffect } from 'react';

import * as allOpponents from '../redux/opponents';

export const KILL_ANIME_DURATION = 0.5; // Second 

export function createOpponent(challengeRating) {
  const opponent = [
    allOpponents.oldMcDonald,
    allOpponents.soldier,
    allOpponents.clown,
  ][Math.floor(Math.random() * 3)];

  return Object.assign({}, opponent, {
    gold: Math.ceil(Math.random() * 10),
  });
};

export function useAnimationFrame(callback) {
  const callbackRef = useRef(callback);
  const timestampRef = useRef(null);

  useLayoutEffect(
    () => {
      callbackRef.current = callback;
    },
    [callback]
  );

  const loop = (timestamp) => {
    frameRef.current = requestAnimationFrame(
      loop
    );
    const cb = callbackRef.current;

    let diff = timestamp - timestampRef.current;
    timestampRef.current = timestamp;
    cb(diff);
  };

  const frameRef = useRef();
  useLayoutEffect(() => {
    frameRef.current = requestAnimationFrame(
      loop
    );
    return () =>
      cancelAnimationFrame(frameRef.current);
  }, []);
};
