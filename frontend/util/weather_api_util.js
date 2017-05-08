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
