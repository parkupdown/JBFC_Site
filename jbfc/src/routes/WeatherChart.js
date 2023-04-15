import { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import Common from "../commonfun";
import { Constants } from "../constants";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
const WeatherInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-left: 50px;
  font-size: 16px;
  width: 30%;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
    height: 100%;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      list-style: none;
      height: 80px;
      margin-bottom: 10px;
      font-size: 14px;
      opacity: 0.85;
      span {
        margin-top: 0px;
      }
    }
  }
`;

function WeatherChart({ data, width, height }) {
  const makeDayWeather = (weatherData) => {
    const dayWeatherArr = [];
    let dayWeather = [];
    for (let i = 0; i < weatherData.length; i++) {
      dayWeather = [...dayWeather, weatherData[i]];
      if (i === 4) {
        dayWeatherArr.push(dayWeather);
        dayWeather = [];
      } else if (i > 4 && i % 8 === 4) {
        dayWeatherArr.push(dayWeather);
        dayWeather = [];
      }
    }
    return dayWeatherArr;
  };

  const getWeatherIcon = (weatherConditionIdData) => {
    let weatherIconArr = [];
    weatherConditionIdData.forEach((item) => {
      if (item < 300) {
        return weatherIconArr.push(Constants.WEATHERICON.THUNDERSTORM);
      }
      if (item < 500) {
        return weatherIconArr.push(Constants.WEATHERICON.DRIZZLE);
      }
      if (item < 600) {
        return weatherIconArr.push(Constants.WEATHERICON.RAIN);
      }
      if (item < 700) {
        return weatherIconArr.push(Constants.WEATHERICON.SNOW);
      }
      if (item < 800) {
        return weatherIconArr.push(Constants.WEATHERICON.ATMOSPHERE);
      }
      if (item === 800) {
        return weatherIconArr.push(Constants.WEATHERICON.CLEAR);
      }
      if (item > 800) {
        return weatherIconArr.push(Constants.WEATHERICON.CLOUDS);
      }
    });
    return weatherIconArr;
  };

  const dayWeatherData = makeDayWeather(data.data.list);
  const timeData = dayWeatherData.map((arr) => Common.UnixToDate(arr[0].dt));
  const maxTempData = dayWeatherData
    .map((arr) => arr.map((item) => item.main.temp_max))
    .map((arr) => Math.floor(Math.max(...arr) - 272.15) + "°C");
  const minTempData = dayWeatherData
    .map((arr) => arr.map((item) => item.main.temp_min))
    .map((arr) => Math.floor(Math.min(...arr) - 272.15) + "°C");
  const weatherConditionIdData = dayWeatherData
    .map((item) => item[0])
    .map((item) => item.weather[0].id);

  const weatherIconArr = getWeatherIcon(weatherConditionIdData);

  // ... 그 외 차트 데이터 처리 로직

  return (
    <Container>
      <ApexChart
        type="line"
        width={width}
        height={height}
        series={[
          { name: "날짜별 최고온도", data: maxTempData },
          {
            name: "날짜별 최저온도",
            data: minTempData,
          },
        ]}
        options={{
          chart: {
            width: 800,
            height: 500,
            type: "line",
            dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2,
            },
            toolbar: {
              show: false,
            },
          },

          colors: ["#77B6EA", "#545454"],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: "smooth",
          },
          title: {
            text: "오후 3시 기준",
            align: "left",
          },
          grid: {
            borderColor: "#e7e7e7",
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          markers: {
            size: 2,
          },
          xaxis: {
            categories: timeData,
            labels: {
              formatter: function (value, index) {
                return value;
              },
              style: {
                colors: "#787878",
              },
            },
          },
          yaxis: {
            title: {},
            min: 0,
            max: 35,
            labels: {
              formatter: function (value) {
                return value + "°C";
              },
              style: {
                colors: "#787878",
              },
            },
          },
          legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
          },
          tooltip: {
            enabled: true,
            x: {
              formatter: "Month: %M",
            },
            y: [
              {
                title: {
                  formatter: function (seriesName) {
                    return "날짜별 최고온도";
                  },
                },
                formatter: function (value) {
                  return value + "°C";
                },
              },
            ],
          },
        }}
      />
      (
      <WeatherInfo>
        <div>
          <ul>
            {weatherIconArr.map((item, index) => (
              <li key={index}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "30px",
                    padding: "15px",
                  }}
                >
                  <i className={item}></i>
                  <span>
                    {maxTempData[index]}/{minTempData[index]}
                  </span>
                  <span style={{ marginTop: "10px" }}>{timeData[index]}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </WeatherInfo>
      )
    </Container>
  );
}

export default WeatherChart;
