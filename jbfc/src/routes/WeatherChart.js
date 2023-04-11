import ApexChart from "react-apexcharts";

function WeatherChart({ data }) {
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

  const UnixToDate = (Unix) => {
    const time = new Date(Unix * 1000);
    const week = [`일`, `월`, `화`, `수`, `목`, `금`, `토`];
    const dayOfWeek = week[time.getDay()];
    return `${time.getMonth() + 1}월 ${time.getDate()}일 ${dayOfWeek}요일`;
  }; //옮겨줘여함

  const dayWeatherData = makeDayWeather(data.data.list);
  const timeData = dayWeatherData.map((arr) => UnixToDate(arr[0].dt));

  const maxTempData = dayWeatherData
    .map((arr) => arr.map((item) => item.main.temp_max))
    .map((arr) => Math.floor(Math.max(...arr) - 272.15) + "°C");

  const minTempData = dayWeatherData
    .map((arr) => arr.map((item) => item.main.temp_min))
    .map((arr) => Math.floor(Math.min(...arr) - 272.15) + "°C");

  /*
  const maxTempData = weatherData.map(
    (item) => Math.floor(item.main.temp_max - 272.15) + "°C"
  );
  const minTempData = weatherData.map(
    (item) => Math.floor(item.main.temp_min - 272.15) + "°C"
  );
  
  console.log(timeData);
  console.log(maxTempData, minTempData);
*/
  return (
    <ApexChart
      type="line"
      series={[
        { name: "날짜별 최고온도", data: maxTempData },
        {
          name: "날짜별 최저온도",
          data: minTempData,
        },
      ]}
      options={{
        chart: {
          height: 350,
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
  );
}

export default WeatherChart;
