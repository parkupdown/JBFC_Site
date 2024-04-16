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
    <>
      <SwipterContainer>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          modules={[Navigation]}
          navigation
        >
          {newsArr.map((news, key) => (
            <SwiperSlide key={key}>
              <a href={news.url} target="blank">
                <img src={news.imgUrl} />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwipterContainer>
    </>
  );
}

const SwipterContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 20px;
  .swiper {
    width: 50%;
    @media (max-width: 860px) {
      width: 100%;
    }
  }
  img {
    border-radius: 10px;
    width: 100%;
    object-fit: cover;
  }
`;
