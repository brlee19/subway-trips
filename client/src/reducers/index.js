import { combineReducers } from 'redux';

import apiReducer from './apiReducer.js';
import tripsReducer from './tripsReducer.js';

export default combineReducers({
  api: apiReducer,
  trips: tripsReducer
});