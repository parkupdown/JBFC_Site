function UnixToDate(Unix) {
  const time = new Date(Unix * 1000);
  const week = [`일`, `월`, `화`, `수`, `목`, `금`, `토`];
  const dayOfWeek = week[time.getDay()];
  return `${
    time.getMonth() + 1
  }월 ${time.getDate()}일 ${time.getHours()}시 ${dayOfWeek}요일`;
} //옮겨줘여함

function Pollution({ data }) {
  const makePollutionInfo = (data) => {
    let pollutionInfo = data.data.list;
    //이건 나중에 자세한 예보를 보여줄 때 사용하면 좋을 거 같다.
    const pm10 = pollutionInfo[0].components.pm10;
    const pm25 = pollutionInfo[0].components.pm2_5;
    const day = UnixToDate(pollutionInfo[0].dt);
    return [pm10, pm25, day];
  };

  return (
    <div>
      <h3>실시간 미세먼지 정보!</h3>
      <ul>
        <li>초미세먼지: {makePollutionInfo(data)[0]}</li>
        <li>미세먼지: {makePollutionInfo(data)[1]}</li>
        <li>기준날짜: {makePollutionInfo(data)[2]}</li>
      </ul>
    </div>
  );
}
export { Pollution, UnixToDate };
