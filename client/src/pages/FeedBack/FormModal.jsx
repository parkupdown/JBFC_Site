import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import { httpClient } from "../../api/http";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ModalContent = styled.div`
  height: 60vh;
  background-color: white;
  padding: 60px;
  border-radius: 5px;
  position: relative;
  overflow-y: scroll;
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

export default function FormModal({ closeModal, scheduleData }) {
  const playerArr = Array.from({ length: scheduleData.num_of_player });
  const [playerNames, setPlayerNames] = useState(
    Array.from({ length: scheduleData.num_of_player }, () => "")
  );
  // 인원수를 알아야하니까 여기서 캐시데이터를 가져오자

  const handleInputChange = (e, index) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = e.target.value;
    setPlayerNames(newPlayerNames);
  };

  const insertPlayerData = async () => {
    httpClient.post("http://localhost:3060/player", {
      playerNames: playerNames,
      schedule_id: scheduleData.id,
    });
  };

  const queryClient = useQueryClient();
  const handleSubmit = async () => {
    //여기에서 Player이름들을 모두 가져와야한다.
    await insertPlayerData();
    queryClient.invalidateQueries(`${scheduleData.id}`);
    closeModal();
  };

  return (
    <ModalBackground>
      <ModalContent>
        <CancelButton onClick={closeModal}>취소</CancelButton>
        {playerArr.map((player, index) => (
          <InputContainer key={index}>
            <InputLabel>player {index + 1}</InputLabel>
            <InputField
              placeholder="참여한 선수를 입력해주세요"
              type="text"
              value={player}
              onChange={(e) => handleInputChange(e, index)}
            />
          </InputContainer>
        ))}
        <Button onClick={() => handleSubmit()}>제출</Button>
      </ModalContent>
    </ModalBackground>
  );
}
/**   <InputContainer>
          <InputLabel>풋살장:</InputLabel>
        </InputContainer>
        <InputContainer>
          <InputLabel>시간:</InputLabel>
        </InputContainer>
        <InputContainer>
          <InputLabel>인원 수:</InputLabel>
        </InputContainer>
        <InputContainer>
          <InputLabel>자체/매칭:</InputLabel>
        </InputContainer>
        <InputContainer>
          <InputLabel>결제금액:</InputLabel>
        </InputContainer> */
