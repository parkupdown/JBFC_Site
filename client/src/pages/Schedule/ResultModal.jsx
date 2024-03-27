import styled from "styled-components";
import { formatNumber } from "../../utils/format";
import { useState } from "react";
import Alert from "../../components/common/Alert";
import { deleteScheduleData } from "../../api/schedule.api";
import FormModal from "./FormModal";
import { useQueryClient } from "react-query";
import { getDate } from "../../utils/getDate";

export default function ResultModal({ scheduleDetailData, closeModal }) {
  const [isAlert, setIsAlert] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const queryClient = useQueryClient();
  const { nowYear, nowMonth, nowDay, nowDayOfWeek } = getDate();

  const refetchCacheDataOfSchedule = (month, day) => {
    if (month === nowMonth && day === nowDay) {
      queryClient.invalidateQueries("todaySchedule");
    }
    if (month === nowMonth) {
      queryClient.invalidateQueries(`${month}월`);
    }
  };

  const openAlert = () => {
    setIsAlert(true);
  };
  const closeAlert = () => {
    setIsAlert(false);
  };
  scheduleDetailData = scheduleDetailData[0];
  const { ground, month, day, type_of_match, num_of_player, price, time } =
    scheduleDetailData;

  const handleDeleteSchedule = async () => {
    await deleteScheduleData(month, day);
    refetchCacheDataOfSchedule(month, day);
    closeAlert();
    closeModal();
  };

  const handleUpdateSchedule = async () => {
    setIsUpdate(true);
  };

  return (
    <>
      {isAlert && (
        <Alert
          target={"일정"}
          okCallback={handleDeleteSchedule}
          noCallback={closeAlert}
        ></Alert>
      )}
      {isUpdate && (
        <FormModal
          month={month}
          day={day}
          closeModal={closeModal}
          isUpdate={isUpdate}
        />
      )}
      {!isUpdate && (
        <TextContainer>
          <SpanField>풋살장: {ground}</SpanField>
          <SpanField>
            날짜: {month}월 {day}일
          </SpanField>
          <SpanField>시간: {time}</SpanField>
          <SpanField>매칭/자체: {type_of_match}</SpanField>
          <SpanField>총인원: {num_of_player}</SpanField>
          <SpanField>구장비: {formatNumber(price)}원</SpanField>
          <SpanField>
            인당:
            {formatNumber(Math.ceil(price / num_of_player))}원
          </SpanField>
          <ButtonBox>
            <Button onClick={handleUpdateSchedule}>일정 수정</Button>
            <DeleteButton onClick={openAlert}>일정 삭제</DeleteButton>
          </ButtonBox>
        </TextContainer>
      )}
    </>
  );
}

const TextContainer = styled.div`
  margin-bottom: 15px;
`;

const SpanField = styled.span`
  display: block;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;
const ButtonBox = styled.div`
  display: flex;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled(Button)`
  background-color: red;
  position: absolute;
  top: 5px;
  left: 5px;
  &:hover {
    background-color: #a50303;
  }
`;
const DeleteButton = styled(CancelButton)`
  position: initial;
  top: 0;
  left: 0;
`;
