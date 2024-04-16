import styled from "styled-components";
import { getCalendarArr, getDate } from "@/utils/getDate";
import { useState } from "react";
import { useSchedule } from "@/hooks/useSchedule";
import ScheduleModal from "./ScheduleModal";

export default function Schedule() {
  // 여기서 month는 state로 관리를 해야함

  const { nowYear, nowMonth, nowDay, nowDayOfWeek } = getDate();
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(nowMonth);
  const [clickedDay, setClickedDay] = useState(nowDay);
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];

  const { isLoading, data } = useSchedule(month);
  let bookedDate;

  if (!isLoading) {
    bookedDate = data.map((item) => item.day);
  }

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
      {!isLoading && (
        <>
          <div className="header">
            <h6>
              {nowYear}년 {month}월 경기 일정
            </h6>
            <div className="navButton">
              <button onClick={handlePrevMonth}>이전</button>
              <button onClick={handleNextMonth}>다음</button>
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
                    <Days
                      className="days"
                      key={i}
                      onClick={() => handleClickDay(day)}
                      isActive={bookedDate.includes(day)}
                    >
                      {day}
                    </Days>
                  ) : (
                    <div key={i}></div>
                  )
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  padding: 20px 0;
  background-color: ${({ theme }) => theme.backgroundColor.box};
  height: 100vh;
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => theme.color.positive};
    font-size: 24px;
  }

  .navButton {
    button {
      @media (max-width: 800px) {
        padding: 10px 12px;
        font-size: 14px;
      }
      background-color: ${({ theme }) => theme.backgroundColor.main};
      border: ${({ theme }) => theme.border.main};
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 14px;
      margin: 0 8px;
      color: ${({ theme }) => theme.color.text};
    }
  }

  .contents {
    background-color: ${({ theme }) => theme.backgroundColor.box};
    text-align: center;
    margin-top: 20px;

    .weeks {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 6px;
      span {
        padding: 10px;
        border: ${({ theme }) => theme.border.main};
      }
      .days {
        @media (max-width: 800px) {
          padding: 10px 0;
          font-size: 14px;
        }
        padding: 13px 0;
        margin: 2px;
        border: ${({ theme }) => theme.border.main};
        border-radius: 5px;
        color: ${({ theme }) => theme.backgroundColor.main};
        font-weight: 200;
        font-size: 16px;
      }
    }
  }
`;
const Days = styled.div`
  background-color: ${(props) =>
    props.isActive ? props.theme.color.positive : props.theme.color.negative};
`;
