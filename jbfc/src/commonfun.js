const Common = {
  UnixToDate: (Unix) => {
    const time = new Date(Unix * 1000);
    const week = [`일`, `월`, `화`, `수`, `목`, `금`, `토`];
    const dayOfWeek = week[time.getDay()];
    return `${time.getMonth() + 1}월 ${time.getDate()}일 ${dayOfWeek}요일 `;
  }, //옮겨줘여함
};
export default Common;
