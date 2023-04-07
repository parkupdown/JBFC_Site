import { Link, Route, Routes, useNavigate } from "react-router-dom";
import LoginBarrier from "./LoginBarrier";
import { Pollution } from "./Pollution";
import Weather from "./Weather";
import PollutionChart from "./PollutionChart";
import WeatherChart from "./WeatherChart";
import { useQuery } from "react-query";
import axios from "axios";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { WeatherPollution } from "../atoms";
import { useEffect } from "react";

function Home() {
  const userId = localStorage.getItem(`userId`);
  const navigate = useNavigate();
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
        reject(`위치를 동의해주세요.`);
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

  const callPollutionApi = (lat, lnd) => {
    return axios
      .get(
        `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lnd}&appid=2834387742b25d5393a21e88fee8246a`
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
    const pollutionData = await callPollutionApi(
      latlnd.coords.latitude,
      latlnd.coords.longitude
    );
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
    background-color: #f2f2f2;
    padding: 20px;
    color: #333;
  `;

  const LogoutButton = styled.button`
    background-color: #03a9f4;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0288d1;
    }
  `;

  const Nav = styled.nav`
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0px;
    border-radius: 30px;
    position: absolute;
    bottom: 20px;
    width: 97%;
    text-align: center;
  `;

  const NavLinks = styled.ul`
    list-style: none;
    display: flex;
  `;

  const NavItem = styled.li`
    margin: 0 50px;
  `;

  const NavLink = styled(Link)`
    font-size: 20px;
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  `;

  return userId === null ? (
    <LoginBarrier />
  ) : (
    <MainContainer>
      <h1>Nice to meet you, {userId}!</h1>
      <LogoutButton
        onClick={() => {
          localStorage.removeItem(`userId`);
          navigate(`/`);
        }}
      >
        log out!
      </LogoutButton>
      <hr />
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <div
            style={{
              height: 680,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Weather data={data[0]} />
            <Pollution data={data[1]} />
          </div>
          <Nav>
            <NavLinks>
              <NavItem>
                <NavLink to="/home">홈</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={`/WeatherPollution`}>세부날씨</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/board">감성글</NavLink>
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
