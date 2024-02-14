import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import img1 from "./Poster/1.png";
import img2 from "./Poster/2.png";
import img3 from "./Poster/3.png";
import img4 from "./Poster/4.jpeg";
import player1 from "./Player/1.png";
import player2 from "./Player/2.png";
import player3 from "./Player/3.png";
import player4 from "./Player/4.png";
import player5 from "./Player/5.png";
import { Link } from "react-router-dom";

const Container = styled.div`
  h1 {
    font-weight: 300;
    text-align: center;
    margin-top: 20px;
  }
  span {
    font-weight: 300;
    text-align: left;
    margin-left: 5px;
    display: block;
    margin-top: 20px;
  }
`;
const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`;
const SwipterContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  text-align: center;
  img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export default function Main() {
  // 여기서 jwt여부 체크해서 없으면 바로 그냥 로그인으로
  const playerArr = [player1, player2, player3, player4, player5];
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  };
  const [userId, setUserId] = useState("");

  const checkAuthorization = async () => {
    try {
      let { data } = await axios.get("http://localhost:3060/token", {
        withCredentials: true,
      });
      console.log(data);
      data = data.userId;

      setUserId(data);
    } catch (error) {
      throw new Error("세션이 만료되었습니다.");
    }
  };

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        await checkAuthorization();
      } catch (error) {
        alert(error);
        goLogin();
      }
    };
    checkUserSession();
  }, []);

  return (
    <Container>
      <h1>짝발란스</h1>
      <NavContainer>
        <div>팀</div>

        <div>
          <Link to={"/board"} state={{ userId: userId }}>
            게시판
          </Link>
        </div>
        <div>경기일정</div>
        <div>피드백</div>
      </NavContainer>
      <span>선수단 소개</span>
      <SwipterContainer>
        <Swiper
          spaceBetween={50}
          slidesPerView={2}
          loop={true}
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 2000 }}
        >
          {playerArr.map((player, index) => (
            <SwiperSlide key={index}>
              <img src={player} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwipterContainer>

      <SwipterContainer>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          modules={[Navigation]}
          navigation
        >
          <SwiperSlide>
            <a href="https://m.sports.naver.com/video/1145409">
              <img src={img1} />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="https://m.sports.naver.com/video/1145598">
              <img src={img2} />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="https://m.sports.naver.com/video/1145464">
              <img src={img3} />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="https://m.sports.naver.com/video/1145375">
              <img src={img4} />
            </a>
          </SwiperSlide>
        </Swiper>
      </SwipterContainer>
    </Container>
  );
}
