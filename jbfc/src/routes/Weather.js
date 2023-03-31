import { UnixToDate } from "./Pollution";

function Weather({ data }) {
  const makeWeatherInfo = (data) => {
    let weatherInfo = data.data.list;
    weatherInfo = weatherInfo[0];
    const maxTemp = Math.floor(weatherInfo.main.temp_max - 272.15);
    const minTemp = Math.floor(weatherInfo.main.temp_min - 272.15);
    const time = UnixToDate(weatherInfo.dt);
    return [maxTemp, minTemp, time];
  };

  //data보내줘

  return (
    <div>
      <ul>
        <li>최고온도: {makeWeatherInfo(data)[0]}도</li>
        <li>최저온도: {makeWeatherInfo(data)[1]}도</li>
        <li>기준날짜: {makeWeatherInfo(data)[2]}</li>
      </ul>
    </div>
  );
}
export default Weather;
