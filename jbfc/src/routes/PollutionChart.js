import styled from "styled-components";
import ApexChart from "react-apexcharts";

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
`;

function PollutionChart({ data }) {
  const pollutionData = data.data.list;
  const timeData = pollutionData.map((item) => item.dt);
  const dustData = pollutionData.map((item) => item.components.pm10);

  return (
    <ChartContainer>
      <ApexChart
        type="line"
        series={[{ name: "DUST", data: dustData }]}
        options={{
          chart: {
            height: 100,
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
            gradient: {
              shade: "dark",
              gradientToColors: ["#0288d1"],
              stops: [0, 100],
            },
          },
          colors: ["#0288d1"],
          tooltip: {
            y: {
              formatter: (value) => `$${value.toFixed(3)}`,
            },
          },
        }}
      />
    </ChartContainer>
  );
}

export default PollutionChart;
