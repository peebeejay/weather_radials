# Weather Lite

## Minimum Viable Product

This app will display the weather for a specific location, defaulting to the user's given geolocation. It will displaying
a weeks worth of forecast data for the location.

The specific values listed will be the high temperature, low temperature, current temperature, wind speed, pressure,
weather icon, english version of weather, conversion between f and c, precipitation percentage, humidity, air pollution index

Also possible is a small graph that displays the hourly temperatures for a selected day, or some other dataset for the given day


- [ ] Forecast Component
- [ ] Sub Graphs ~ hourly temperatures OR other visualization
- [ ] Production README

## Technologies, Libraries, APIs

This app will use Google's geocoding service to convert location names into coordinates. Additionally, it will use the
OpenWeatherMap API to get current and future weather data. The specific services used will be 'Current weather data' &
'5 day / 3 hours forecast'

## Wireframes

## Component Hierarchy

App
  Forecast
    ForecastDay
  CurrentWeather
  Subgraphs

## Implementation Timeline

### Phase 1
1. Set up skeleton
2. Create Forecast Component
  - Create SubComponents -
3. Create Current Weather Component

### Phase 2
1. Learn D3
2. Create Subgraphs Component
3. Potentially Circular visualization of some sort
