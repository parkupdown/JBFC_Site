import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { Link, Route, Routes, Switch, useNavigate } from "react-router-dom"; // import Routes and Switch components
import { WeatherPollution } from "../atoms";
import WeatherChart from "./WeatherChart";
import PollutionChart from "./PollutionChart";
import { useEffect, useState } from "react";
import Common from "../commonfun";

const Container = styled.div`
  padding: 16px;
  height: 100vh;
  height: 100vw;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 36px;
  margin-bottom: 16px;
  color: #3b5998;
  font-weight: 400;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const StyledLink = styled(Link)`
  font-size: 20px;
  padding: 20px 40px;
  border-radius: 30px;
  text-decoration: none;
  color: #fff;
  background-color: #3b5998;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  &:active {
    transform: translateY(1px);
  }

  &[aria-current="page"] {
    background-color: #ccc;
    color: #fff;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3b5998;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
  transition: all 0.2s ease;

  &:hover {
    background-color: #eee;
    border-color: #bbb;
  }

  &:active {
    background-color: #ddd;
    border-color: #999;
  }
`;

function DetailWeatherPollution() {
  // Recoil을 사용하여 날씨, 미세먼지 데이터를 불러온다.
  const data = useRecoilValue(WeatherPollution);

  // 화면에 맞게 그래프가 그려지도록 한다.
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.7);
  const [chartHeight, setChartHeight] = useState(window.innerHeight * 0.8);

  // 사이즈를 조절하는데 필요한 함수
  const handleResize = () => {
    setChartWidth(window.innerWidth * 0.7);
    setChartHeight(window.innerHeight * 0.6);
  };

  //화면을 감지하고 resize할 수 있는 이밴트 리스너를 등록한다.
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <Link to={`/home`}>
        <BackButton>뒤로가기</BackButton>
      </Link>
      <Title>JJack Balance</Title>
      <LinkWrapper>
        <StyledLink to={`/WeatherPollution/weather`}>날씨</StyledLink>
        <StyledLink to={`/WeatherPollution/pollution`}>미세먼지</StyledLink>
      </LinkWrapper>
      {/* Wrap Routes with Switch component */}
      <Routes>
        <Route
          path="weather"
          element={
            <WeatherChart
              data={data[0]}
              width={chartWidth}
              height={chartHeight}
            />
          }
        ></Route>
        <Route
          path="pollution"
          element={
            <PollutionChart
              data={data[1]}
              width={chartWidth}
              height={chartHeight}
            />
          }
        ></Route>
      </Routes>
    </Container>
  );
}

export default DetailWeatherPollution;

/* */
