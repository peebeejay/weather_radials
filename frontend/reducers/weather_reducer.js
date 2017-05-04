import { RECEIVE_WEATHER, REMOVE_WEATHER } from '../actions/weather_actions.js';
import { merge } from 'lodash';

const WeatherReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type) {
    case RECEIVE_WEATHER:
      return merge({}, action.weather);

    case REMOVE_WEATHER:
      return {};

    default:
      return state;
  }
};

export default WeatherReducer;
