import styled from "styled-components";
import { formatNumber } from "@/utils/format";
import { useState } from "react";
import Alert from "@/components/common/Alert";
import { deleteScheduleData } from "@/api/schedule.api";
import FormModal from "./FormModal";
import { useQueryClient } from "react-query";
import { getDate } from "@/utils/getDate";
import { queryClient } from "@/App";

export default function ResultModal({ scheduleDetailData, closeModal }) {
  const [isAlert, setIsAlert] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const { nowYear, nowMonth, nowDay, nowDayOfWeek } = getDate();

  const refetchCacheDataOfSchedule = (month, day) => {
    month = Number(month);
    if (month === nowMonth && day === nowDay) {
      queryClient.invalidateQueries("todaySchedule");
    }
    if (month === nowMonth) {
      queryClient.invalidateQueries(`${month}월`);
      queryClient.invalidateQueries(`${month}players`);
      queryClient.invalidateQueries(`${month}votes`);
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
          <SpanField>총인원: {num_of_player}명</SpanField>
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
  padding: 12px;
  background-color: ${({ theme }) => theme.backgroundColor.box};
  border: ${({ theme }) => theme.border.main};
  border-radius: 10px;
  font-size: 16px;
  font-weight: 400;
  margin-top: 10px;
  opacity: 0.8;
  color: ${({ theme }) => theme.color.positive};
`;
const ButtonBox = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.color.positive};
  color: ${({ theme }) => theme.backgroundColor.main};
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 5px;
  &:hover {
    background-color: ${({ theme }) => theme.color.positiveClicked};
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.negative};
  position: absolute;
  top: 5px;
  left: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.color.negativeClicked};
  }
`;
const DeleteButton = styled(CancelButton)`
  position: initial;
  top: 0;
  left: 0;
`;
