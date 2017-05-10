import { combineReducers } from 'redux';
import WeatherReducer from './weather_reducer.js';

const rootReducer = combineReducers({
  weather: WeatherReducer
});

export default rootReducer;
