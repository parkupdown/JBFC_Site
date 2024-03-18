import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "react-query";
import { getLastestBoardData } from "../../api/board.api";
import { getTodayScheduleData } from "../../api/schedule.api";
import { BoardLastest } from "./BoardLastest";
import { ScheduleToday } from "./ScheduleToday";
import { SportsNews } from "./SportsNews";

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
  const goBoard = () => {
    navigate("/board");
  };

  const { isLoading: boardLoading, data: boardData } = useQuery(
    "lastestBoardData",
    getLastestBoardData
  );
  const { isLoading: scheduleLoading, data: scheduleData } = useQuery(
    "todaySchedule",
    getTodayScheduleData
  );

  return (
    <Container>
      <NavContainer>
        <div onClick={goTeam}>팀</div>
        <div onClick={goBoard}>게시판</div>
        <div onClick={goSchedule}>경기일정</div>
        <div onClick={goFeedBack}>피드백</div>
      </NavContainer>
      <BoardScheduleContainer>
        {!boardLoading && <BoardLastest boardData={boardData[0]} />}
        {!scheduleLoading && <ScheduleToday scheduleData={scheduleData} />}
      </BoardScheduleContainer>
      <SportsNews />
    </Container>
  );
}

const Container = styled.div`
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
const BoardScheduleContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
