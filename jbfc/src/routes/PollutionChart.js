import ApexChart from "react-apexcharts";
import { UnixToDate } from "./Pollution";

function PollutionChart({ data }) {
  console.log(data);
  const pollutionData = data.data.list;
  const timeData = pollutionData.map((item) => item.dt);
  const dustData = pollutionData.map((item) => item.components.pm10);
  console.log(data);
  return (
    <ApexChart
      type="line"
      series={[
        {
          name: "DUST",
          data: dustData,
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
export default PollutionChart;
