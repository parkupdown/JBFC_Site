import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import FormModal from "./FormModal";
import VoteModal from "./VoteModal";
import FeedBackResult from "./FeedBackResult";
import styled from "styled-components";

export default function FeedBackNested({
  closeModal,
  scheduleId,
  playerNum,
  playerData,
}) {
  return (
    <ModalBackground>
      <ModalContent>
        <CancelButton onClick={closeModal}>취소</CancelButton>
        <Routes>
          <Route
            path="/form"
            element={
              <FormModal
                closeModal={closeModal}
                scheduleId={scheduleId}
                playerNum={playerNum}
              />
            }
          />
          <Route
            path="/vote"
            element={
              <VoteModal
                closeModal={closeModal}
                playerData={playerData}
                scheduleId={scheduleId}
              />
            }
          />
          <Route
            path="/result"
            element={<FeedBackResult scheduleId={scheduleId} />}
          />
        </Routes>
      </ModalContent>
    </ModalBackground>
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
