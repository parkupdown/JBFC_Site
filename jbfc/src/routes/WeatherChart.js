import { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import Common from "../commonfun";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
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

  const dayWeatherData = makeDayWeather(data.data.list);
  const timeData = dayWeatherData.map((arr) => Common.UnixToDate(arr[0].dt));
  const maxTempData = dayWeatherData
    .map((arr) => arr.map((item) => item.main.temp_max))
    .map((arr) => Math.floor(Math.max(...arr) - 272.15) + "°C");
  const minTempData = dayWeatherData
    .map((arr) => arr.map((item) => item.main.temp_min))
    .map((arr) => Math.floor(Math.min(...arr) - 272.15) + "°C");

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
            size: 1,
          },
          xaxis: {
            categories: timeData,
            title: {},
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
                    return "Temperature";
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
    </Container>
  );
}

export default WeatherChart;
