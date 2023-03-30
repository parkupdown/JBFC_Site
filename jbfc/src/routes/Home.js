import { useQuery } from "react-query";
import axios from "axios";

import LoginBarrier from "./LoginBarrier";

function Home() {
  const userId = localStorage.getItem(`userId`);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      });
    });
  };
  const callApi = (lat, lnd) => {
    return axios
      .get(
        `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lnd}&appid=2834387742b25d5393a21e88fee8246a`
      )
      .then((res) => res);
  };

  const getPollution = async () => {
    const latlnd = await getLocation();
    const data = await callApi(latlnd.coords.latitude, latlnd.coords.longitude);

    return data;
  };
  const { isLoading, data } = useQuery("Pollution", getPollution);

  const UnixToDate = (Unix) => {
    const time = new Date(Unix * 1000);
    const week = [`일`, `월`, `화`, `수`, `목`, `금`, `토`];
    const dayOfWeek = week[time.getDay()];
    return `${
      time.getMonth() + 1
    }월 ${time.getDate()}일 ${time.getHours()}시 ${dayOfWeek}요일`;
  };

  const makePollutionInfo = (data) => {
    let pollutionInfo = data.data.list;
    pollutionInfo = pollutionInfo.filter(
      (item, index) => index % 24 === 0 || index === pollutionInfo.length - 1
    );
    const pmInfo = pollutionInfo.map((item) => item.components);
    const timeInfo = pollutionInfo.map((item) => UnixToDate(item.dt));
    //이건 나중에 자세한 예보를 보여줄 때 사용하면 좋을 거 같다.
    const pm10 = pmInfo[0].pm10;
    const pm25 = pmInfo[0].pm2_5;
    const day = timeInfo[0];
    return [pm10, pm25, day];
  };

  if (isLoading === false) {
    makePollutionInfo(data);
  }

  return userId === null ? (
    <LoginBarrier />
  ) : (
    <div>
      Home입니다.
      <h1>반갑습니다.{userId}님!</h1>
      <hr />
      <h2>
        {isLoading ? (
          "로딩중"
        ) : (
          <div>
            <h3>실시간 미세먼지 정보!</h3>
            <ul>
              <li>초미세먼지: {makePollutionInfo(data)[0]}</li>
              <li>미세먼지: {makePollutionInfo(data)[1]}</li>
              <li>오늘의 날짜: {makePollutionInfo(data)[2]}</li>
            </ul>
          </div>
        )}
      </h2>
    </div>
  );
}
/*
 */
export default Home;
