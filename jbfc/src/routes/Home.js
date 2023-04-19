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
import { Constants } from "../constants";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 5vw; /* viewport 단위 사용 */
  color: #1877f2;
  text-align: center;
  margin-top: 5vw; /* viewport 단위 사용 */
  margin-bottom: 6vw; /* viewport 단위 사용 */
  font-weight: 500;
`;

const LogoutButton = styled.button`
  background-color: #1877f2;
  color: #fff;
  border: none;
  padding: 3vw; /* viewport 단위 사용 */
  border-radius: 5px;
  font-size: 3vw; /* viewport 단위 사용 */
  margin-right: 0px;
  text-align: right;
  cursor: pointer;

  &:hover {
    background-color: #1560bd;
  }
`;

const Nav = styled.nav`
  background-color: #fff;
  height: 10vw; /* viewport 단위 사용 */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 15vw; /* viewport 단위 사용 */
  position: fixed;
  bottom: 5vw; /* viewport 단위 사용 */
  width: 100%;
  max-width: 500px;
  box-shadow: 0px 0px 4vw rgba(0, 0, 0, 0.1); /* viewport 단위 사용 */
  overflow-x: hidden; /* 모바일에서 가로 스크롤이 생기지 않도록 */
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
`;

const NavItem = styled.li`
  margin: 0 5vw; /* viewport 단위 사용 */
`;

const NavLink = styled(Link)`
  font-size: 5vw; /* viewport 단위 사용 */
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
  height: calc(100vh - 30vw); /* viewport 단위 사용 */
  margin-top: 2vw; /* viewport 단위 사용 */
  background-color: #fff;
  border-radius: 38vw; /* viewport 단위 사용 */
  overflow-x: hidden; /* 모바일에서 가로 스크롤이 생기지 않도록 */
`;

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
      .get(Constants.APIURL.WEATHER(lat, lnd))
      .then((res) => res)
      .catch((res) => alert(res));
  };

  const callRealPollutionApi = () => {
    return axios
      .get(Constants.APIURL.POLLUTION)
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

  const { isLoading, data, error, refetch } = useQuery("Weather", getWeather);
  const setWeatherPollution = useSetRecoilState(WeatherPollution);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 15 * 60 * 1000);

    if (!isLoading) {
      setWeatherPollution(data);
    }

    return () => clearInterval(interval);
  }, [data]);
  //이부분수정해야할듯

  return userId === null ? (
    <LoginBarrier />
  ) : (
    <MainContainer>
      <Title> {userId}님, 오늘도 즐거운 풋살 되세요!</Title>
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
          <div>
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
