import { combineReducers } from 'redux';

import arenaReducer from './arenaReducer';
import characterReducer from './characterReducer';

const rootReducer = combineReducers({
  arena:      arenaReducer,
  character:  characterReducer,
});

export default rootReducer;
