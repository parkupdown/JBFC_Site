import styled from "styled-components";
import ApexChart from "react-apexcharts";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  margin-left: 30px;
`;

function PollutionChart({ data, width, height }) {
  const pollutionData = data.data.response.body.items[7];

  return (
    <Container>
      <ApexChart
        type="treemap"
        width={width}
        height={height}
        series={[
          {
            data: [
              {
                x: `실시간 미세먼지: ${pollutionData.pm10Value} ㎍/㎥`,
                y: 218,
              },
              {
                x: `실시간 초미세먼지: ${pollutionData.pm25Value} ㎍/㎥`,
                y: 149,
              },
              {
                x: `오늘 하루 평균 미세먼지: ${pollutionData.pm10Value24} ㎍/㎥`,
                y: 184,
              },
              {
                x: `오늘 하루 평균 초미세먼지: ${pollutionData.pm25Value24} ㎍/㎥`,
                y: 155,
              },
              {
                x: `오늘의 미세먼지 등급: ${pollutionData.pm10Grade} `,
                y: 200,
              },
              {
                x: `오늘의 초미세먼지 등급: ${pollutionData.pm25Grade}`,
                y: 101,
              },
              {
                x: "측정소: 건국동",
                y: 70,
              },
            ],
          },
        ]}
        options={{
          chart: {
            type: "treemap",
          },
          title: {
            text: "미세먼지 정보",
            align: "center",
          },
          subtitle: {
            text: "미세먼지 1등급: 매우좋음 2등급: 좋음 3등급: 나쁨 4등급: 매우나쁨",
          },
          tooltip: {
            enabled: false,
          },

          legend: {
            show: false,
          },
        }}
      />
    </Container>
  );
}

export default PollutionChart;
