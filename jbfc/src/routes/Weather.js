import { UnixToDate } from "./Pollution";
import styled from "styled-components";
import { Constants } from "../constants";

function Weather({ data }) {
  const makeWeatherInfo = (data) => {
    let weatherInfo = data.data.list;
    weatherInfo = weatherInfo[0];
    const maxTemp = Math.floor(weatherInfo.main.temp_max - 272.15);
    //최고온도
    const minTemp = Math.floor(weatherInfo.main.temp_min - 272.15);
    //최저온도
    const averageTemp = Math.floor(weatherInfo.main.temp - 272.15);
    //평균온도
    const time = UnixToDate(weatherInfo.dt);

    let message;
    let iconClassName;
    // 온도에 따라 메세지 다르게 출력
    if (averageTemp < 0) {
      message = Constants.WEATHER.COLD;
      iconClassName = Constants.WEATHERICON.COLD;
    }
    if (averageTemp >= 0 && averageTemp < 12) {
      message = Constants.WEATHER.CHILLY;
      iconClassName = Constants.WEATHERICON.CHILLY;
    }
    if (averageTemp >= 12 && averageTemp < 20) {
      message = Constants.WEATHER.GOOD;
      iconClassName = Constants.WEATHERICON.GOOD;
    }
    if (averageTemp >= 20 && averageTemp < 30) {
      message = Constants.WEATHER.WARM;
      iconClassName = Constants.WEATHERICON.WARM;
    }
    if (averageTemp >= 30) {
      message = Constants.WEATHER.HOT;
      iconClassName = Constants.WEATHERICON.HOT;
    }
    //상수 처리 해주어야함

    return [averageTemp, maxTemp, minTemp, time, message, iconClassName];
  };

  // send data

  const Container = styled.div`
    background-color: #f2f2f2;
    color: #333;
    padding: 20px;
  `;

  const InfoList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
  `;

  const InfoItem = styled.li`
    margin: 0.5rem 0;
  `;

  const WeatherHeader = styled.h3`
    color: #0288d1;
    font-size: 24px;
    margin-bottom: 10px;
  `;

  return (
    <Container>
      <WeatherHeader>실시간 내 위치 날씨</WeatherHeader>
      <InfoList>
        <i class={makeWeatherInfo(data)[5]}></i>
        <InfoItem>{makeWeatherInfo(data)[4]}</InfoItem>
        <InfoItem>현재온도: {makeWeatherInfo(data)[0]} ℃</InfoItem>
        <InfoItem>최고 온도: {makeWeatherInfo(data)[1]} ℃</InfoItem>
        <InfoItem>최저 온도: {makeWeatherInfo(data)[2]} ℃</InfoItem>
        <InfoItem>측정 기준: {makeWeatherInfo(data)[3]} </InfoItem>
      </InfoList>
    </Container>
  );
}

export default Weather;
