import { useQuery } from "react-query";
import axios from "axios";
import { UnixToDate } from "./Pollution";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { WeatherInfo } from "../atoms";

function Weather() {
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      });
    });
  };

  const callWeatherApi = (lat, lnd) => {
    return axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lnd}&appid=2834387742b25d5393a21e88fee8246a`
      )
      .then((res) => res);
  };

  const getWeather = async () => {
    const latlnd = await getLocation();
    const weatherData = await callWeatherApi(
      latlnd.coords.latitude,
      latlnd.coords.longitude
    );
    return weatherData;
  };

  const { isLoading, data } = useQuery("Weather", getWeather);

  const setWeather = useSetRecoilState(WeatherInfo);
  setWeather(data);

  const makeWeatherInfo = (data) => {
    let weatherInfo = data.data.list;
    weatherInfo = weatherInfo[0];
    const maxTemp = Math.floor(weatherInfo.main.temp_max - 272.15);
    const minTemp = Math.floor(weatherInfo.main.temp_min - 272.15);
    const time = UnixToDate(weatherInfo.dt);
    return [maxTemp, minTemp, time];
  };

  if (isLoading === false) {
    makeWeatherInfo(data);
  }
  //data보내줘

  return (
    <div>
      {isLoading ? (
        "로딩중입니당"
      ) : (
        <ul>
          <li>최고온도: {makeWeatherInfo(data)[0]}도</li>
          <li>최저온도: {makeWeatherInfo(data)[1]}도</li>
          <li>기준날짜: {makeWeatherInfo(data)[2]}</li>
        </ul>
      )}
    </div>
  );
}
export default Weather;
