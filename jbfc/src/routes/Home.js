import { Link, Route, Routes, useNavigate } from "react-router-dom";
import LoginBarrier from "./LoginBarrier";
import { Pollution } from "./Pollution";
import Weather from "./Weather";
import { useQuery } from "react-query";
import axios from "axios";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { WeatherPollution } from "../atoms";
import { useEffect } from "react";
import Loading from "./Loading";

function Home() {
  const userId = localStorage.getItem(`userId`);
  const navigate = useNavigate();
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
        reject(`위치사용에 동의해주세요.`);
      });
    });
  };

  const callWeatherApi = (lat, lnd) => {
    return axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lnd}&appid=2834387742b25d5393a21e88fee8246a`
      )
      .then((res) => res)
      .catch((res) => alert(res));
  };

  const callRealPollutionApi = () => {
    return axios
      .get(
        `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=ZHRtNHeVdq3RstoihtljiyUq1bREx70chuG19hWrdBrZr8cs%2Bzcc1KtztI15NVWUwNWX7qTJQFG8gcgdTEILUA%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EA%B4%91%EC%A3%BC&ver=1.1`
      )
      .then((res) => res)
      .catch((res) => alert(res));
  };

  const getWeather = async () => {
    const latlnd = await getLocation();
    const weatherData = await callWeatherApi(
      latlnd.coords.latitude,
      latlnd.coords.longitude
    );
    const pollutionData = await callRealPollutionApi();

    return [weatherData, pollutionData];
  };

  const { isLoading, data } = useQuery("Weather", getWeather);

  const setWeatherPollution = useSetRecoilState(WeatherPollution);

  useEffect(() => {
    if (!isLoading) {
      setWeatherPollution(data);
    }
  }, [isLoading, data, setWeatherPollution]);
  //이부분수정해야할듯
  const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const Title = styled.h1`
    font-size: 30px;
    color: #1877f2;
    text-align: center;
    margin-top: 21px;
    margin-bottom: 24px;
    font-weight: 500;
  `;

  const LogoutButton = styled.button`
    background-color: #1877f2;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-size: 12px;
    margin-right: 0px; /* 변경된 부분 */
    text-align: right;
    cursor: pointer;

    &:hover {
      background-color: #1560bd;
    }
  `;

  const Nav = styled.nav`
    background-color: #fff;
    height: 60px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 30px;
    position: fixed;
    bottom: 20px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  `;

  const NavLinks = styled.ul`
    list-style: none;
    display: flex;
  `;

  const NavItem = styled.li`
    margin: 0 20px;
  `;

  const NavLink = styled(Link)`
    font-size: 20px;
    color: #65676b;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &.active {
      color: #1877f2;
      font-weight: bold;
    }
  `;

  const WeatherPollutionContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 70vw;
    height: calc(100vh - 430px);
    margin-top: 10px;
    background-color: #fff;
    border-radius: 76px;
  `;

  return userId === null ? (
    <LoginBarrier />
  ) : (
    <MainContainer>
      <Title> {userId}님, 오늘도 즐거운 풋살 되세요.</Title>
      <LogoutButton
        onClick={() => {
          localStorage.removeItem(`userId`);
          navigate(`/`);
        }}
      >
        로그아웃
      </LogoutButton>
      <hr />
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <div
            style={{
              height: 680,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <WeatherPollutionContainer>
              <Weather data={data[0]} />
              <Pollution data={data[1]} />
            </WeatherPollutionContainer>
          </div>
          <Nav>
            <NavLinks>
              <NavItem>
                <NavLink to="/home">홈</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={`/WeatherPollution/weather`}>세부날씨</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/board">게시판</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/chat">채팅</NavLink>
              </NavItem>
            </NavLinks>
          </Nav>
        </>
      )}
    </MainContainer>
  );
}

/*
 */
export default Home;
