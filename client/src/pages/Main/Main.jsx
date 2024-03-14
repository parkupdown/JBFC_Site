import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getLastestBoardData } from "../../api/board.api";
import { getTodayScheduleData } from "../../api/schedule.api";

export default function Main() {
  // 여기서 jwt여부 체크해서 없으면 바로 그냥 로그인으로
  const navigate = useNavigate();

  const goTeam = () => {
    navigate("/team");
  };
  const goSchedule = () => {
    navigate("/schedule");
  };
  const goFeedBack = () => {
    navigate("/feedback");
  };

  //게시글 최신글 긁어오자

  const { isLoading: boardLoading, data: boardData } = useQuery(
    "lastestBoardData",
    getLastestBoardData
  );

  //cashe처리가 되니까 expire가 되어도 그냥 진행되는구나..

  const { isLoading: scheduleLoading, data: scheduleData } = useQuery(
    "todaySchedule",
    getTodayScheduleData
  );

  return (
    <Container>
      <h1>짝발란스</h1>
      <NavContainer>
        <div onClick={() => goTeam()}>팀</div>
        <div>
          <Link to={"/board"} state={{ userId: 2 }}>
            게시판
          </Link>
        </div>
        <div onClick={() => goSchedule()}>경기일정</div>
        <div onClick={() => goFeedBack()}>피드백</div>
      </NavContainer>
      <BoardAndScheduleContainer>
        {boardLoading ? null : (
          <BoardContainer>
            {boardData[0] === undefined ? (
              <h3>최근게시글이존재하지 않습니다</h3>
            ) : (
              <div onClick={() => navigate(`/board/detail/${boardData[0].id}`)}>
                <h3>최근 게시글</h3>
                <div>
                  {boardData[0].thumbnail === null ? (
                    <ImgBox>
                      <img src="http://localhost:3060/image/thumbnail.jpeg" />
                    </ImgBox>
                  ) : (
                    <ImgBox>
                      <img
                        src={`http://localhost:3060/image/${boardData[0].thumbnail}`}
                      />
                    </ImgBox>
                  )}
                  <p>제목: {boardData[0].title}</p>
                  <p>-{boardData[0].content.substr(0, 10)}</p>
                  <p> {boardData[0].user_id}</p>
                </div>
              </div>
            )}
          </BoardContainer>
        )}
        {/*경기일정 */}
        {scheduleLoading ? null : (
          <ScheduleContainer>
            {scheduleData.length === 0 ? (
              <h2>오늘은 경기가 없습니다.</h2>
            ) : (
              <ScheduleAndImgBox>
                <div>
                  <h2>오늘 경기</h2>
                  <p>광주 {scheduleData[0].ground}</p>
                  <p>시간: {scheduleData[0].time}</p>
                  <p>자체/매칭: {scheduleData[0].type_of_match}</p>
                  <p>참여인원: {scheduleData[0].num_of_player}</p>
                  <p>{scheduleData[0].price}원/2시간</p>
                </div>
                <ImgBox>
                  <img src={`/Ground/${scheduleData[0].ground}.png`} />
                </ImgBox>
              </ScheduleAndImgBox>
            )}
          </ScheduleContainer>
        )}
      </BoardAndScheduleContainer>

      {/* 최신 게시글 */}

      <SwipterContainer>
        <h2>News!</h2>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          modules={[Navigation]}
          navigation
        >
          <SwiperSlide>
            <a href="https://m.sports.naver.com/video/1145409" target="blank">
              <img src={`/Poster/1.png`} />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="https://m.sports.naver.com/video/1145598" target="blank">
              <img src={`/Poster/2.png`} />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="https://m.sports.naver.com/video/1145464" target="blank">
              <img src={`/Poster/3.png`} />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="https://m.sports.naver.com/video/1145375" target="blank">
              <img src={`/Poster/4.jpeg`} />
            </a>
          </SwiperSlide>
        </Swiper>
      </SwipterContainer>
    </Container>
  );
}

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
const BoardAndScheduleContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const BoardContainer = styled.div`
  width: 50vw;
  padding: 20px;
  border: 1px dotted black;
  border-radius: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
`;

const ScheduleContainer = styled.div`
  width: 95vw;
  padding: 20px;
  border: 1px dotted black;
  border-radius: 20px;
`;
const ScheduleAndImgBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 95vw;
`;
const ImgBox = styled.div`
  width: 40vw;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 14px;
  }
`;
