import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { useQuery, useQueryClient } from "react-query";
import { httpClient } from "../../api/http";

function ModalDetail({
  scheduleDetailData,
  closeModal,
  clickedDay,
  setIsUpdateSchedule,
}) {
  const queryClient = useQueryClient();

  const deleteSchedule = async () => {
    let [month, day] = clickedDay.split(`월`);
    const deletedData = await httpClient.delete(
      `/schedule?month=${month}&day=${day}`
    );
    queryClient.setQueryData(`${month}월`, (prev) => deletedData.data);
    queryClient.invalidateQueries("todaySchedule");
    closeModal();
  };

  return (
    <ModalBackground>
      <ModalContent>
        <CancelButton onClick={() => closeModal()}>취소</CancelButton>
        {scheduleDetailData && (
          <TextContainer>
            <SpanField>풋살장: {scheduleDetailData[0].ground}</SpanField>
            <SpanField>
              날짜: {scheduleDetailData[0].month}월 {scheduleDetailData[0].day}
              일
            </SpanField>
            <SpanField>시간: {scheduleDetailData[0].time}</SpanField>
            <SpanField>
              매칭/자체: {scheduleDetailData[0].type_of_match}
            </SpanField>
            <SpanField>총인원: {scheduleDetailData[0].num_of_player}</SpanField>
            <SpanField>구장비: {scheduleDetailData[0].price}원</SpanField>
            <SpanField>
              인당:
              {Math.ceil(
                scheduleDetailData[0].price /
                  scheduleDetailData[0].num_of_player
              )}
              원
            </SpanField>
            <ButtonBox>
              <Button
                onClick={() => setIsUpdateSchedule((current) => !current)}
              >
                일정 수정
              </Button>
              <DeleteButton onClick={() => deleteSchedule()}>
                일정 삭제
              </DeleteButton>
            </ButtonBox>
          </TextContainer>
        )}
      </ModalContent>
    </ModalBackground>
  );
}

export default function ScheduleDetailModal({ closeModal, clickedDay }) {
  const [day, month] = clickedDay.split(`월`);
  const [scheduleDetailData, setScheduleDetailData] = useState(null);
  const [isUpdateSchedule, setIsUpdateSchedule] = useState(false);
  //캐싱안하고 그냥 useEffect로
  // 굳이 캐싱하지 않아도됨
  const getScheduleDetailData = async () => {
    const getScheduleDetail = await httpClient.get(
      `/schedule/detail?month=${month}&day=${day}`
    );
    return getScheduleDetail.data;
  };

  useEffect(() => {
    const getScheduleDetail = async () => {
      const data = await getScheduleDetailData();
      setScheduleDetailData(data);
    };
    getScheduleDetail();
  }, []);

  return (
    <>
      {isUpdateSchedule ? (
        <Modal
          closeModal={closeModal}
          clickedDay={clickedDay}
          isUpdateSchedule={isUpdateSchedule}
        ></Modal>
      ) : (
        <ModalDetail
          scheduleDetailData={scheduleDetailData}
          closeModal={closeModal}
          clickedDay={clickedDay}
          setIsUpdateSchedule={setIsUpdateSchedule}
        ></ModalDetail>
      )}
    </>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 60px;
  border-radius: 5px;
  position: relative;
`;

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
