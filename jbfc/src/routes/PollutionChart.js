import styled from "styled-components";
import ApexChart from "react-apexcharts";

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
`;

function PollutionChart({ data }) {
  const makeDayPollution = (pollutionData) => {
    const dayPollutionArr = [];
    let dayPollution = [];

    for (let i = 0; i < pollutionData.length; i++) {
      dayPollution = [...dayPollution, pollutionData[i]];
      if (i === 9) {
        dayPollutionArr.push(dayPollution);
        dayPollution = [];
      } else if (i > 9 && i % 24 === 9) {
        dayPollutionArr.push(dayPollution);
        dayPollution = [];
      }
    }
    dayPollutionArr.push(dayPollution);
    return dayPollutionArr;
  };

  const UnixToDate = (Unix) => {
    const time = new Date(Unix * 1000);
    const week = [`일`, `월`, `화`, `수`, `목`, `금`, `토`];
    const dayOfWeek = week[time.getDay()];
    return `${time.getMonth() + 1}월 ${time.getDate()}일 ${dayOfWeek}요일 `;
  };

  const pollutionData = data.data.list;
  const dayPollutionData = makeDayPollution(pollutionData);

  const timeData = dayPollutionData.map((arr) => UnixToDate(arr[0].dt));
  console.log(dayPollutionData);
  const dustData = dayPollutionData
    .map((arr, arrIndex) =>
      arr.filter((item, index) => {
        if (arrIndex === 0) {
          return index === 0;
        } else if (arrIndex === 4) {
          return index === 8;
        } else {
          return index === 15;
        }
      })
    )
    .map((arr) => arr[0].components);
  const fineDustData = dustData.map((item) => item.pm10 + "pm10");
  const microDustData = dustData.map((item) => item.pm2_5 + "pm2_5");

  return (
    <ApexChart
      type="line"
      series={[
        { name: "미세먼지", data: fineDustData },
        {
          name: "초미세먼지",
          data: microDustData,
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
          max: 150,
          labels: {
            formatter: function (value) {
              return value + "pm";
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
                  return "미세먼지";
                },
              },
              formatter: function (value) {
                return value + "pm";
              },
            },
          ],
        },
      }}
    />
  );
}

export default PollutionChart;
