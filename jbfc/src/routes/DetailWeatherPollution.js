import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { Link, Route, Routes, Switch, useNavigate } from "react-router-dom"; // import Routes and Switch components
import { WeatherPollution } from "../atoms";
import WeatherChart from "./WeatherChart";
import PollutionChart from "./PollutionChart";

function DetailWeatherPollution() {
  const data = useRecoilValue(WeatherPollution);
  const navigator = useNavigate();

  const goBack = () => {
    navigator(-1);
  };

  const Container = styled.div`
    padding: 16px;
  `;

  const Title = styled.h3`
    text-align: center;
    font-size: 24px;
    margin-bottom: 16px;
  `;

  const LinkWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  `;

  const StyledLink = styled(Link)`
    font-size: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-decoration: none;
    color: #333;
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
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    font-size: 14px;
    color: #333;
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
  return (
    <Container>
      <BackButton onClick={goBack}>뒤로가기</BackButton>{" "}
      <Title>JJack Balance</Title>
      <LinkWrapper>
        <StyledLink to={`/WeatherPollution/weather`}>Weather</StyledLink>
        <StyledLink to={`/WeatherPollution/pollution`}>Fine dust</StyledLink>
      </LinkWrapper>
      {/* Wrap Routes with Switch component */}
      <Routes>
        <Route path="weather" element={<WeatherChart data={data[0]} />}></Route>
        <Route
          path="pollution"
          element={<PollutionChart data={data[1]} />}
        ></Route>
      </Routes>
    </Container>
  );
}

export default DetailWeatherPollution;

/* */
