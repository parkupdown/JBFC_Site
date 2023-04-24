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
import api from "../api";

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
  height: calc(100vh - 350px);
  margin-top: 10px;
  background-color: #fff;
  border-radius: 76px;
`;

function Home() {
  const userId = localStorage.getItem(`userId`);
  const navigate = useNavigate();

  // 사용자의 위치를 받아오는 함수
  const getLocation = () => {
    return new Promise(async (resolve, reject) => {
      try {
        navigator.geolocation.getCurrentPosition((position) =>
          resolve(position)
        );
      } catch (error) {
        reject("위치사용에 동의해주세요.");
      }
    });
  };

  // 날씨 API를 통해 날씨 정보를 가져오는 함수
  const callWeatherApi = (lat, lnd) => {
    return axios
      .get(api.WEATHER(lat, lnd))
      .then((res) => res)
      .catch((res) => {
        throw new Error(`날씨 정보를 불러오는 중 오류가 발생했습니다.`);
      });
  };

  // 미세먼지 API를 통해 미세먼지 정보를 가져오는 함수
  const callPollutionApi = () => {
    return axios
      .get(api.POLLUTION)
      .then((res) => res)
      .catch((res) => {
        throw new Error(`대기 오염 정보를 불러오는 중 오류가 발생했습니다.`);
      });
  };

  // 비동기 함수들을 동기적으로 호출하여 최종적으로 날씨데이터와 미세먼지데이터를 배열의형태로 반환
  const fetchWeatherData = async () => {
    const latlnd = await getLocation();
    const weatherData = await callWeatherApi(
      latlnd.coords.latitude,
      latlnd.coords.longitude
    );
    const pollutionData = await callPollutionApi();

    return [weatherData, pollutionData];
  };

  //Recoil로 전역으로 관리하기위해 setter 함수생성
  const setWeatherPollution = useSetRecoilState(WeatherPollution);

  //useQuery를 통해 날씨 데이터와 미세먼지 데이터를 가져올 수 있는 함수를 실행
  const { isLoading, data, error, refetch } = useQuery(
    "Weather",
    fetchWeatherData
  );

  //15분마다 refetch하도록 설계 (미세먼지 데이터가 15분마다 갱신)
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refetch]);

  // useQuery를 활용해서 isLoading이 false면 최초 1회 전역상태관리 setter함수를 통해
  // data를 전역에 둠
  useEffect(() => {
    if (!isLoading) {
      setWeatherPollution(data);
    }
  }, [data]);

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
