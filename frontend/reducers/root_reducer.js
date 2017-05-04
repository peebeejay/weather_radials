import { combineReducers } from 'redux';
import SessionReducer from './session_reducer.js';
import WeatherReducer from './weather_reducer.js';

const rootReducer = combineReducers({
  weather: WeatherReducer
});

export default rootReducer;
