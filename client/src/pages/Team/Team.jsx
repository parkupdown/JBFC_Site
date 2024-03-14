import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
const SwiperContainer = styled.div`
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
export default function Team() {
  const players = Array.from({ length: 5 });
  const navigator = useNavigate();
  const goBack = () => navigator(-1);
  return (
    <div>
      <span onClick={goBack}>뒤로가기</span>
      <SwiperContainer>
        <Swiper
          spaceBetween={50}
          slidesPerView={2}
          loop={true}
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 2000 }}
        >
          {players.map((player, index) => (
            <SwiperSlide key={index}>
              <img src={`/Player/${index + 1}.png`} />
              {/*  위 코드는 아마 배포 후 개선해야함 
          해당 파일 위치를 찾기 어려우니 import.meta.env.~~를써야할듯
          (북마크에 정보 있음)*/}
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
    </div>
  );
}
