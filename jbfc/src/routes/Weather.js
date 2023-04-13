import { UnixToDate } from "./Pollution";
import styled, { keyframes } from "styled-components";
import { Constants } from "../constants";
import "animate.css";

const Container = styled.div`
  color: #333;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const InfoItem = styled.li`
  margin: 0.6rem 0;
`;
const InfoTitleItem = styled.li`
  margin: 0.6rem 0;
  font-size: 20px;
  font-weight: 600;
  animation: pulse;
  animation-iteration-count: 5;
  animation-duration: 1s;
  animation-delay: 3s;
`;

const WeatherHeader = styled.h3`
  color: #3b5998;
  font-size: 24px;
  margin-top: 0;
  font-weight: bold;
`;

const SubHeader = styled.p`
  color: #3b5998;
  font-size: 14px;
  margin-top: 0;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Icon = styled.i`
  margin-top: 20px;
  font-size: 72px;
  margin-bottom: 20px;
  animation: bounceInDown;
  animation-iteration-count: 1;
  animation-duration: 1s;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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

  return (
    <Container>
      <WeatherContainer>
        <SubHeader>현재위치</SubHeader>
        <WeatherHeader>실시간 내 위치 날씨</WeatherHeader>
      </WeatherContainer>

      <Icon className={makeWeatherInfo(data)[5]}></Icon>
      <InfoList>
        <InfoTitleItem>{makeWeatherInfo(data)[4]}</InfoTitleItem>
        <InfoItem>현재온도: {makeWeatherInfo(data)[0]} ℃</InfoItem>
        <InfoItem>최고 온도: {makeWeatherInfo(data)[1]} ℃</InfoItem>
        <InfoItem>최저 온도: {makeWeatherInfo(data)[2]} ℃</InfoItem>
      </InfoList>
    </Container>
  );
}

export default Weather;
