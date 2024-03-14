import { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import axios from "axios";
import { useQuery } from "react-query";
import { useEffect } from "react";
import ScheduleDetailModal from "./ScheduleDetail";
import { httpClient } from "../../api/http";

const CalendarContainer = styled.div`
  margin: 20px auto;
  width: 100vw;
  height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  overflow: auto;
`;

const Day = styled.div`
  text-align: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${(props) => (props.today ? "#007bff" : "transparent")};
  color: ${(props) => (props.today ? "#fff" : "#000")};
`;

const CellBox = styled.div`
  border: ${(props) => `1.5px dotted ${props.scheduled}`};
  padding: 25px;
  font-size: 10px;
  text-align: center;
`;

const Calendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedDay, setClickedDay] = useState(null);
  const [clickedDayNotMonth, setClickedDayNotMonth] = useState(null);
  const [scheduledDay, setScheduledDay] = useState([]);

  //여기서 캐싱해서 db의 데이터를 가져옴
  const getScheduleData = async () => {
    const getSchedule = await httpClient.get(
      `http://localhost:3060/schedule?month=${month}`
    );
    const scheduleData = getSchedule.data;
    return scheduleData;
  };

  const { isLoading, data } = useQuery(`${month}월`, getScheduleData);

  useEffect(() => {
    if (!isLoading) {
      setScheduledDay(() => {
        const scheduledDayArr = data.map((item) => parseInt(item.day));
        return scheduledDayArr;
      });
    }
  }, [data]);

  const closeModal = () => {
    setIsModalOpen(false);
    setClickedDay(null);
  };

  const clickSchedule = (e) => {
    const getScheduleDay = e.target.id;
    setIsModalOpen((current) => !current);
    setClickedDay(getScheduleDay);
    const [month, day] = getScheduleDay.split(`월`);
    setClickedDayNotMonth(parseInt(day));
    // 모달을 켜고 스케줄 데이터를 가져옴
  };

  const getFirstDayOfMonth = () => {
    return new Date(year, month - 1, 1).getDay();
  };

  const getLastDayOfMonth = () => {
    return new Date(year, month, 0).getDate();
  };

  const goToPreviousMonth = () => {
    setMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1));
    setYear((prevMonth) => (prevMonth === 1 ? year - 1 : year));
  };

  const goToNextMonth = () => {
    setMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1));
    setYear((prevMonth) => (prevMonth === 12 ? year + 1 : year));
  };

  const daysInMonth = getLastDayOfMonth();
  const startingDay = getFirstDayOfMonth();
  const days = [];

  for (let i = 1; i <= startingDay; i++) {
    days.push(<div key={`empty-${i}`} className="empty"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(
      <CellBox
        onClick={(e) => clickSchedule(e)}
        key={`day-${i}`}
        id={`${month}월${i}`}
        scheduled={scheduledDay.includes(i) ? "green" : "red"}
      >
        {`${i}`}
      </CellBox>
    );
  }

  return (
    <CalendarContainer>
      <Header>
        <span>{`${year}년 ${month}월`}</span>
        <div>
          <Button onClick={goToPreviousMonth}>이전 달</Button>
          <Button onClick={goToNextMonth}>다음 달</Button>
        </div>
      </Header>

      {scheduledDay.includes(clickedDayNotMonth)
        ? isModalOpen && (
            <ScheduleDetailModal
              closeModal={closeModal}
              clickedDay={clickedDay}
            ></ScheduleDetailModal>
          )
        : isModalOpen && (
            <Modal
              closeModal={closeModal}
              clickedDay={clickedDay}
              isUpdateSchedule={false}
            ></Modal>
          )}
      <DaysContainer>
        <Day>일</Day>
        <Day>월</Day>
        <Day>화</Day>
        <Day>수</Day>
        <Day>목</Day>
        <Day>금</Day>
        <Day>토</Day>
        {days}
      </DaysContainer>
    </CalendarContainer>
  );
};

export default Calendar;
