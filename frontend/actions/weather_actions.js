import * as WeatherAPIUtil from '../util/weather_api_util.js';

export const RECEIVE_WEATHER = "RECEIVE_WEATHER";
export const REMOVE_WEATHER = "REMOVE_WEATHER";

export const receiveWeather = (weather) => ({
  type: RECEIVE_WEATHER,
  weather
});

export const removeWeather = () => ({
  type: REMOVE_WEATHER
});

export const fetch5Day = (lat, lon) => dispatch => {
  return WeatherAPIUtil.fetch5Day(lat, lon).then(
    (weather) => dispatch(receiveWeather(weather))
  );
};

export const fetchDaily = (lat, lon) => dispatch => {
  return WeatherAPIUtil.fetchDaily(lat, lon).then(
    (weather) => dispatch(receiveWeather(weather))
  );
};
