import styled from "styled-components";
import { getCalendarArr, getDate } from "../../utils/getDate";
import { useState } from "react";
import { useSchedule } from "../../hooks/useSchedule";
import ScheduleModal from "./ScheduleModal";

export default function Schedule() {
  // 여기서 month는 state로 관리를 해야함

  const { nowYear, nowMonth, nowDay, nowDayOfWeek } = getDate();
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(nowMonth);
  const [clickedDay, setClickedDay] = useState(nowDay);
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const { isLoading, data } = useSchedule(month);

  const handleClickDay = (day) => {
    setClickedDay(day);
    openModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleNextMonth = () => {
    setMonth((current) => {
      return (current + 1) % 12 === 0 ? 12 : (current + 1) % 12;
    });
  };
  const handlePrevMonth = () => {
    setMonth((current) => {
      return (current - 1) % 12 === 0 ? 12 : (current - 1) % 12;
    });
  };

  const calendarArr = getCalendarArr(nowYear, month);

  return (
    <Container>
      {isOpen && (
        <ScheduleModal closeModal={closeModal} month={month} day={clickedDay} />
      )}
      <div className="header">
        <h6>
          {nowYear}년 {month}월 경기 일정
        </h6>
        <div className="navButton">
          <button onClick={handleNextMonth}>다음</button>
          <button onClick={handlePrevMonth}>이전</button>
        </div>
      </div>
      <div className="contents">
        <div className="weeks">
          {weeks.map((week, i) => (
            <span key={i}>{week}</span>
          ))}
        </div>
        {calendarArr.map((weeks) => (
          <div className="weeks">
            {weeks.map((day, i) =>
              day ? (
                <div
                  className="days"
                  key={i}
                  onClick={() => handleClickDay(day)}
                >
                  {day}
                </div>
              ) : (
                <div key={i}></div>
              )
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .contents {
    background-color: antiquewhite;
    text-align: center;
    margin-top: 20px;

    .weeks {
      display: grid;
      grid-template-columns: repeat(7, 1fr);

      span {
        padding: 10px;
        background-color: #e8e6e6;
      }
      .days {
        padding: 5px;
        margin: 2px;
        border: 1px solid black;
        border-radius: 5px;
      }
    }
  }
`;
