import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "react-query";
import { getTodayScheduleData } from "../../api/schedule.api";
import { BoardLastest } from "./BoardLastest";
import { ScheduleToday } from "./ScheduleToday";
import { SportsNews } from "./SportsNews";
import { FaRegUser } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FiCoffee } from "react-icons/fi";
import { useBoards } from "../../hooks/useBoards";
import { fetchBoard } from "../../api/board.api";

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

  const { boardLoading, boardData } = useBoards("lastestBoardData");
  const { isLoading: scheduleLoading, data: scheduleData } = useQuery(
    "todaySchedule",
    getTodayScheduleData
  );

  return (
    <Container>
      <NavContainer>
        <div className="category" onClick={goTeam}>
          <FaRegUser />
          <span>팀</span>
        </div>
        <div className="category" onClick={goBoard}>
          <IoChatbubblesOutline />
          <span>게시판</span>
        </div>
        <div className="category" onClick={goSchedule}>
          <FaRegCalendarAlt />
          <span>경기일정</span>
        </div>
        <div className="category" onClick={goFeedBack}>
          <FiCoffee />
          <span>피드백</span>
        </div>
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
  margin-top: 20px;
  padding: 20px 0;
  .category {
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
      margin-left: 12px;
    }
    //background-color: ${({ theme }) => theme.color.background};
  }
`;

const BoardScheduleContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
