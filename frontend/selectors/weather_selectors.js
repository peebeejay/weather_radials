import { isEmpty } from 'lodash';

export const annualSelector = (weather) => {
  if (!_.isEmpty(weather)) {
    let packaged_data = []; // [{ date: '...', TMAX: X, TMIN: Y }, {...}, ...]

    let year = getOffsetDate(weather.results[0].date).getYear() + 1900;
    let date_iterator = new Date(year, 0, 1);

    for (let x = 0; x < 365; x++ ) {
      let daily_data = { date: new Date(date_iterator), TMAX: 0, TMIN: 0 };

      for (let y = 0; y < weather.results.length; y++){
        // debugger
        if (getOffsetDate(weather.results[y].date).getTime() === daily_data.date.getTime() ||
            new Date(weather.results[y].date).getTime() === daily_data.date.getTime() ) {
          if (weather.results[y].datatype === "TMAX") {
            daily_data.TMAX = weather.results[y].value;
          }
          else if (weather.results[y].datatype === "TMIN") {
            daily_data.TMIN = weather.results[y].value;
          }
        }
      }

      if (Math.abs(daily_data.TMAX - daily_data.TMIN) > 40  &&
         (daily_data.TMAX === 0 || daily_data.TMIN === 0)) {

        if (daily_data.TMIN === 0) {
          daily_data.TMIN = daily_data.TMAX - 15;
        } else if (daily_data.TMAX === 0) {
          daily_data.TMAX = daily_data.TMIN + 15;
        }
      }

      packaged_data.push(daily_data);
      date_iterator.setDate(date_iterator.getDate() + 1);
    }
    // debugger
    return packaged_data;

  } else {
    return [];
  }
};

// Helper Functions
const getOffsetDate = (date) => {
  let _date_from_data = new Date(date);
  let date_offset = _date_from_data.getTimezoneOffset() * 60000;
  let new_date = new Date(_date_from_data.valueOf() + date_offset);

  return new_date;
};
