import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useQueryClient } from "react-query";
import { httpClient } from "../../api/http";

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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 60px;
  border-radius: 5px;
  position: relative;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;
const SelectField = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
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

export default function Modal({ closeModal, clickedDay, isUpdateSchedule }) {
  const [ground, setGround] = useState("청개구리");
  const [time, setTime] = useState("14시-16시");
  const [numOfPlayer, setNumOfPlayer] = useState("");
  const [typeOfMatch, setTypeOfMatch] = useState("자체");
  const [price, setPrice] = useState("");

  const queryClient = useQueryClient();

  const insertSchedule = async () => {
    let [month, day] = clickedDay.split(`월`);
    day = parseInt(day);
    const scheduleData = {
      month: month,
      day: day,
      ground: ground,
      time: time,
      num_of_player: numOfPlayer,
      type_of_match: typeOfMatch,
      price: price,
    };

    const newScheduleData = await httpClient.post("/schedule", scheduleData);

    queryClient.setQueryData(`${month}월`, (prev) => {
      return [...prev, newScheduleData.data].sort((a, b) => a.day - b.day);
    });
    queryClient.invalidateQueries("todaySchedule");
    // 캐싱된 데이터에서 위 데이터를 업데이트 해주면 된다.
    closeModal();
  };
  const updateSchedule = async () => {
    let [month, day] = clickedDay.split(`월`);
    day = parseInt(day);
    const scheduleData = {
      month: month,
      day: day,
      ground: ground,
      time: time,
      num_of_player: numOfPlayer,
      type_of_match: typeOfMatch,
      price: price,
    };
    await httpClient.put(`/schedule`, scheduleData);
    // 캐싱 새롭게할 필요가 없다.
    queryClient.invalidateQueries("todaySchedule");
    closeModal();
  };

  // isUpdateSchedule이 true면 update하는식으로
  return (
    <ModalBackground>
      <ModalContent>
        <CancelButton onClick={() => closeModal()}>취소</CancelButton>
        <InputContainer>
          <InputLabel>풋살장:</InputLabel>
          <SelectField
            placeholder="대여 풋살장"
            value={ground}
            onChange={(e) => setGround(e.target.value)}
          >
            <option value="청개구리">청개구리</option>
            <option value="북구챔스">북구챔스</option>
            <option value="상무챔스">상무챔스</option>
            <option value="상지풋살">상지풋살</option>
            <option value="베스트풋살">베스트풋살</option>
            <option value="JK">JK</option>
            <option value="기타">기타</option>
          </SelectField>
        </InputContainer>
        <InputContainer>
          <InputLabel>시간:</InputLabel>
          <SelectField
            placeholder="대여 시간"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="9시-11시">9시-11시</option>
            <option value="10시-12시">10시-12시</option>
            <option value="11시-13시">11시-13시</option>
            <option value="13시-15시">13시-15시</option>
            <option value="14시-16시">14시-16시</option>
            <option value="15시-17시">15시-17시</option>
            <option value="16시-18시">16시-18시</option>
            <option value="17시-19시">17시-19시</option>
            <option value="18시-20시">18시-20시</option>
            <option value="19시-21시">19시-21시</option>
            <option value="20시-22시">20시-22시</option>
            <option value="21시-23시">21시-23시</option>
            <option value="22시-24시">22시-24시</option>
          </SelectField>
        </InputContainer>
        <InputContainer>
          <InputLabel>인원 수:</InputLabel>
          <InputField
            placeholder="경기 인원"
            type="number"
            value={numOfPlayer}
            onChange={(e) => setNumOfPlayer(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>자체/매칭:</InputLabel>
          <SelectField
            value={typeOfMatch}
            onChange={(e) => setTypeOfMatch(e.target.value)}
          >
            <option value="매칭">매칭</option>
            <option value="자체">자체</option>
          </SelectField>
        </InputContainer>
        <InputContainer>
          <InputLabel>결제금액:</InputLabel>
          <InputField
            placeholder="후불결제시 미정입력"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </InputContainer>
        <Button onClick={isUpdateSchedule ? updateSchedule : insertSchedule}>
          Submit
        </Button>
      </ModalContent>
    </ModalBackground>
  );
}
