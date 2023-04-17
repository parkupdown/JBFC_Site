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
  margin-bottom: 13px;
`;

const InfoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const InfoItem = styled.li`
  margin: 0.6rem 0;
  font-weight: 500;
  background-color: aliceblue;
  padding: 5px;
  border-radius: 10px;
`;
const InfoTitleItem = styled.li`
  padding: 20px;
  background-color: #3b5998;
  border-radius: 30px;
  margin: 0.6rem 0 1rem 0;
  font-size: 20px;
  font-weight: 600;
  animation: pulse;
  animation-iteration-count: 5;
  animation-duration: 1s;
  animation-delay: 3s;
  color: white;
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
  const findDataIndex = () => {
    const nowHour = new Date().getHours();

    let dataIndex = 0;
    if (nowHour < 14) {
      dataIndex = 0;
      return dataIndex;
    }
    if (nowHour < 17) {
      dataIndex = 1;
      return dataIndex;
    }
    if (nowHour < 20) {
      dataIndex = 2;
      return dataIndex;
    }
    dataIndex = 3;
    return dataIndex;
  };

  const makeWeatherInfo = (data) => {
    const dataIndex = findDataIndex(data);
    let weatherInfo = data.data.list[dataIndex];
    const maxTemp = Math.floor(weatherInfo.main.temp_max - 272.15);
    //최고온도
    const minTemp = Math.floor(weatherInfo.main.temp_min - 272.15);
    //최저온도
    const averageTemp = Math.floor(weatherInfo.main.temp - 272.15);
    //평균온도

    const weatherConditionId = weatherInfo.weather[0].id;
    let message;
    let iconClassName;

    // 온도에 따라 메세지 다르게 출력
    if (weatherConditionId < 300) {
      message = Constants.WEATHER.THUNDERSTORM;
      iconClassName = Constants.WEATHERICON.THUNDERSTORM;
    }
    if (weatherConditionId < 500) {
      message = Constants.WEATHER.DRIZZLE;
      iconClassName = Constants.WEATHERICON.DRIZZLE;
    }
    if (weatherConditionId < 600) {
      message = Constants.WEATHER.RAIN;
      iconClassName = Constants.WEATHERICON.RAIN;
    }
    if (weatherConditionId < 700) {
      message = Constants.WEATHER.SNOW;
      iconClassName = Constants.WEATHERICON.SNOW;
    }
    if (weatherConditionId < 800) {
      message = Constants.WEATHER.ATMOSPHERE;
      iconClassName = Constants.WEATHERICON.ATMOSPHERE;
    }
    if (weatherConditionId === 800) {
      message = Constants.WEATHER.CLEAR;
      iconClassName = Constants.WEATHERICON.CLEAR;
    }
    if (weatherConditionId > 800) {
      message = Constants.WEATHER.CLOUDS;
      iconClassName = Constants.WEATHERICON.CLOUDS;
    }
    //상수 처리 해주어야함

    return [averageTemp, maxTemp, minTemp, message, iconClassName];
  };

  const weatherInfo = makeWeatherInfo(data);
  // send data

  return (
    <Container>
      <WeatherContainer>
        <SubHeader>현재위치</SubHeader>
        <WeatherHeader>실시간 내 위치 날씨</WeatherHeader>
      </WeatherContainer>

      <Icon className={weatherInfo[4]} style={{ color: "#3b5998" }}></Icon>
      <InfoList>
        <InfoTitleItem>{weatherInfo[3]}</InfoTitleItem>
        <InfoItem>현재온도: {weatherInfo[0]} ℃</InfoItem>
        <InfoItem>최고 온도: {weatherInfo[1]} ℃</InfoItem>
        <InfoItem>최저 온도: {weatherInfo[2]} ℃</InfoItem>
      </InfoList>
    </Container>
  );
}

export default Weather;
