export const getDate = () => {
  const date = new Date();
  const nowYear = date.getFullYear();
  const nowMonth = date.getMonth() + 1;
  const nowDayOfWeek = date.getDay();
  const nowDay = date.getDate();

  return { nowYear, nowMonth, nowDay, nowDayOfWeek };
};

const getDayOfWeeks = (year, month, day) => {
  const date = new Date(`${year}-${month}-${day}`).getDay();

  return date;
};

const getLastDay = (year, month) => {
  const date = new Date(year, month, 0).getDate();

  return date;
};

export const getCalendarArr = (year, month) => {
  const calendarArr = [];
  let day = 1;
  let lastDay = getLastDay(year, month);

  for (let i = 0; i < 5; i++) {
    const arr = [];
    for (let j = 0; j < 7; j++) {
      let dayOfWeeks = getDayOfWeeks(year, month, day);
      if (dayOfWeeks === j) {
        arr.push(day);
        day++;
      } else if (dayOfWeeks !== j) {
        arr.push(``);
      }
      if (day > lastDay) {
        return calendarArr;
      }
    }
    calendarArr.push(arr);
  }

  return calendarArr;
};
export const getTime = () => {
  const date = new Date();
  return `${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
};
