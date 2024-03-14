import axios from "axios";
import { useQuery } from "react-query";
import FormModal from "./FormModal";
import styled from "styled-components";
import { httpClient } from "../../api/http";

// 일단 여기로 들어와서 만약 아직 생성된 투표가 없다면 ? 으로가는걸로
// eslint-disable-next-line react/prop-types
export default function VoteModal({ scheduleData, closeModal }) {
  //캐싱해서 가져오기

  // 여기서 해당 schedule에 대한 데이터를 가져와서 만약 없다면?
  // 없습니다. 피드백 창을 만들기
  // 있다면? 바로 결과를 보여주기

  const getPlayerData = async () => {
    const getData = await httpClient.get(
      `http://localhost:3060/player/${scheduleData.id}`
    );
    return getData.data;
  };

  const { isLoading, data } = useQuery(`${scheduleData.id}`, getPlayerData);

  // 그럼 여기서 이제 인원에 대한 투표를 넣어줘야함
  return (
    <div>
      {isLoading ? (
        <h3>로딩중입니다.</h3>
      ) : data.length === 0 ? (
        <FormModal
          scheduleData={scheduleData}
          closeModal={closeModal}
        ></FormModal>
      ) : (
        <div>
          <h1>투표창</h1>
          <ModalBackground>
            <ModalContent>
              <CancelButton onClick={closeModal}>취소</CancelButton>
              {data.map((player, index) => (
                <InputContainer key={player.id}>
                  <InputLabel>player {player.player}</InputLabel>
                  <InputField type="range" min="0" max="10" />
                </InputContainer>
              ))}
              <Button>제출</Button>
            </ModalContent>
          </ModalBackground>
        </div>
      )}
    </div>
  );
}
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
