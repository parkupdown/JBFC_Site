import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const newsArr = [
  {
    url: "https://m.sports.naver.com/video/1145409",
    imgUrl: `/Poster/1.png`,
  },
  {
    url: "https://m.sports.naver.com/video/1145598",
    imgUrl: `/Poster/2.png`,
  },
  {
    url: "https://m.sports.naver.com/video/1145464",
    imgUrl: `/Poster/3.png`,
  },
  {
    url: "https://m.sports.naver.com/video/1145375",
    imgUrl: `/Poster/4.jpeg`,
  },
];

export function SportsNews() {
  return (
    <SwipterContainer>
      <h3>News!</h3>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        modules={[Navigation]}
        navigation
      >
        {newsArr.map((news, key) => (
          <SwiperSlide key={key}>
            <a href={news.url}>
              <img src={news.imgUrl} />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwipterContainer>
  );
}
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
