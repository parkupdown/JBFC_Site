import ApexChart from "react-apexcharts";
function WeatherChart({ data }) {
  console.log(data);
  const weatherData = data.data.list;
  const timeData = weatherData.map((item) => item.dt_txt);
  const tempData = weatherData.map(
    (item) => Math.floor(item.main.temp - 272.15) + "도"
  );

  return (
    <ApexChart
      type="line"
      series={[
        {
          name: "TEMP",
          data: tempData,
        },
      ]}
      options={{
        chart: {
          height: 50,
          width: 100,
          toolbar: {
            show: false,
          },
          background: "transparent",
        },
        stroke: {
          curve: "smooth",
          width: 3,
        },
        grid: {
          show: false,
        },
        xaxis: {
          type: "datetime",
          axisTicks: {
            show: false,
          },
          labels: { show: true },
          categories: timeData,
        },
        yaxis: { show: true },
        fill: {
          type: "gradient",
          gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
        },
        colors: ["#0fbcf9"],
        tooltip: {
          y: {
            formatter: (value) => `$${value.toFixed(3)}`,
          },
        },
      }}
    />
  );
}

export default WeatherChart;
