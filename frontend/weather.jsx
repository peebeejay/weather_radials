import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

// REMOVE IN PRODUCTION
import * as WeatherAPIUtil from './util/weather_api_util.js';
import * as d3 from 'd3';
import { fetch5Day, fetchDaily } from './actions/weather_actions.js';
// END REMOVE IN PRODUCTION

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  window.store = store;
  window.fetch5Day = WeatherAPIUtil.fetch5Day;
  window.fetchDaily = WeatherAPIUtil.fetchDaily;
  window.d3 = d3;
  // debugger
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={ store } />, root);
});
