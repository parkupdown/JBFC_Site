import { Link, Route, Routes } from "react-router-dom";
import LoginBarrier from "./LoginBarrier";
import { Pollution } from "./Pollution";
import Weather from "./Weather";
import PollutionChart from "./PollutionChart";
import WeatherChart from "./WeatherChart";
import { useQuery } from "react-query";
import axios from "axios";

function Home() {
  const userId = localStorage.getItem(`userId`);

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

  const callPollutionApi = (lat, lnd) => {
    return axios
      .get(
        `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lnd}&appid=2834387742b25d5393a21e88fee8246a`
      )
      .then((res) => res);
  };

  const getWeather = async () => {
    const latlnd = await getLocation();
    const weatherData = await callWeatherApi(
      latlnd.coords.latitude,
      latlnd.coords.longitude
    );
    const pollutionData = await callPollutionApi(
      latlnd.coords.latitude,
      latlnd.coords.longitude
    );
    return [weatherData, pollutionData];
  };

  const { isLoading, data } = useQuery("Weather", getWeather);

  return userId === null ? (
    <LoginBarrier />
  ) : (
    <div>
      <h1>반갑습니다.{userId}님!</h1>
      <hr />
      {isLoading ? (
        "로딩중입니다."
      ) : (
        <>
          <Weather data={data[0]} />
          <Pollution data={data[1]} />
          <Link to={`/home/weather`}>
            <h3>날씨예보정보보기</h3>
          </Link>
          <Link to={`/home/pollution`}>
            <h3>미세먼지예보정보보기</h3>
          </Link>
          <Link to={`/home/`}>
            <h3>Home으로가기</h3>
          </Link>
          <Routes>
            <Route path="weather" element={<WeatherChart data={data[0]} />} />
            <Route
              path="pollution"
              element={<PollutionChart data={data[1]} />}
            />
          </Routes>
        </>
      )}
    </div>
  );
}
/*
 */
export default Home;
