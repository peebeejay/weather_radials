export const fetch5Day = (lat, lon) => {
  return $.ajax({
    method: "GET",
    url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=bcb83c4b54aee8418983c2aff3073b3b&mode=json`
  });
};
