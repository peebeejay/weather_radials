export const fetch5Day = (lat, lon) => {
  return $.ajax({
    method: "GET",
    url: `https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=bcb83c4b54aee8418983c2aff3073b3b&mode=json&units=imperial`
  });
};

export const fetchDaily = (lat, lon) => {
  return $.ajax({
    method: "GET",
    url: `https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&APPID=bcb83c4b54aee8418983c2aff3073b3b&mode=json&units=imperial`
  });
};

export const search = (location) => {
  return $.ajax({
    method: "GET",
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBW-S4D3sWi25Qwr2UNbYaf1CguSP-Wfiw`
  });
};

// NOAA NCDC API util methods
// Sample for Data request:
// https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&startdate=2014-01-01&enddate=2015-01-01&stationid=GHCND:USW00014732&datatypeid=TMIN&units=standard&datatypeid=TMAX

export const fetchAnnual = (stationId, startDate, endDate) => {
  // Date Format: YYYY-MM-DD
  return $.ajax({
    method: "GET",
    headers: { "token":"wUdKaVEYoXeeSRvoAIOPADrHwuzTZzYw" },
    url: `https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&startdate=${startDate}&enddate=${endDate}&stationid=${stationId}&datatypeid=TMIN&datatypeid=TMAX&units=standard`

  });
};
