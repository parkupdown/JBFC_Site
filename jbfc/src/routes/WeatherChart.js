import ApexChart from "react-apexcharts";

function WeatherChart({ data }) {
  const weatherData = data.data.list;
  const timeData = weatherData.map((item) => item.dt_txt);
  const tempData = weatherData.map(
    (item) => Math.floor(item.main.temp - 272.15) + "°C"
  );

  return (
    <ApexChart
      type="line"
      series={[{ name: "Temperature", data: tempData }]}
      options={{
        chart: {
          height: 300,
          width: "100%",
          background: "transparent",
          zoom: {
            enabled: false,
          },
        },
        stroke: {
          curve: "smooth",
          width: 3,
        },
        grid: {
          show: true,
          borderColor: "#f1f1f1",
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
        xaxis: {
          type: "datetime",
          axisTicks: {
            show: false,
          },
          labels: {
            show: true,
            style: {
              colors: "#787878",
            },
          },
          categories: timeData,
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          show: true,
          labels: {
            formatter: function (value) {
              return value + "°C";
            },
            style: {
              colors: "#787878",
            },
          },
        },
        markers: {
          size: 0,
          style: "hollow",
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            colorStops: [
              {
                offset: 0,
                color: "#00bfff",
                opacity: 1,
              },
              {
                offset: 100,
                color: "#1E90FF",
                opacity: 1,
              },
            ],
          },
        },
        colors: ["#1E90FF"],
        tooltip: {
          enabled: true,
          x: {
            format: "dd/MM/yy HH:mm",
          },
          y: {
            formatter: function (value) {
              return value + "°C";
            },
            title: {
              formatter: (seriesName) => "Temperature",
            },
          },
          theme: "dark",
          style: {
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
          },
        },
      }}
    />
  );
}

export default WeatherChart;
