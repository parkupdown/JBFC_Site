import { useQuery } from "react-query";
import axios from "axios";
import { PollutionInfo } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

function UnixToDate(Unix) {
  const time = new Date(Unix * 1000);
  const week = [`일`, `월`, `화`, `수`, `목`, `금`, `토`];
  const dayOfWeek = week[time.getDay()];
  return `${
    time.getMonth() + 1
  }월 ${time.getDate()}일 ${time.getHours()}시 ${dayOfWeek}요일`;
} //옮겨줘여함

function Pollution() {
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

  const setPollution = useSetRecoilState(PollutionInfo);
  setPollution(data);

  const makePollutionInfo = (data) => {
    let pollutionInfo = data.data.list;
    const timeInfo = pollutionInfo.map((item) => UnixToDate(item.dt));
    //이건 나중에 자세한 예보를 보여줄 때 사용하면 좋을 거 같다.
    const pm10 = pollutionInfo[0].components.pm10;
    const pm25 = pollutionInfo[0].components.pm2_5;
    const day = UnixToDate(pollutionInfo[0].dt);
    return [pm10, pm25, day];
  };

  if (isLoading === false) {
    makePollutionInfo(data);
  }

  return (
    <div>
      {isLoading ? (
        "로딩중입니당"
      ) : (
        <div>
          <h3>실시간 미세먼지 정보!</h3>
          <ul>
            <li>초미세먼지: {makePollutionInfo(data)[0]}</li>
            <li>미세먼지: {makePollutionInfo(data)[1]}</li>
            <li>기준날짜: {makePollutionInfo(data)[2]}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
export { Pollution, UnixToDate };
