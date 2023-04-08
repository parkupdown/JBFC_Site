import { UnixToDate } from "./Pollution";
import styled from "styled-components";

function Weather({ data }) {
  const makeWeatherInfo = (data) => {
    let weatherInfo = data.data.list;
    weatherInfo = weatherInfo[0];
    const maxTemp = Math.floor(weatherInfo.main.temp_max - 272.15);
    const minTemp = Math.floor(weatherInfo.main.temp_min - 272.15);
    const time = UnixToDate(weatherInfo.dt);
    return [maxTemp, minTemp, time];
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
        <InfoItem>최고 온도: {makeWeatherInfo(data)[0]} ℃</InfoItem>
        <InfoItem>최저 온도: {makeWeatherInfo(data)[1]} ℃</InfoItem>
        <InfoItem>측정 기준: {makeWeatherInfo(data)[2]} </InfoItem>
      </InfoList>
    </Container>
  );
}

export default Weather;
