import { combineReducers } from 'redux';

import apiReducer from './apiReducer.js';
import tripsReducer from './tripsReducer.js';
import mapReducer from './mapReducer.js';

export default combineReducers({
  api: apiReducer,
  trips: tripsReducer,
  googleMap: mapReducer
});