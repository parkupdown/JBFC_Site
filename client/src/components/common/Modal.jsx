import styled from "styled-components";

export default function Modal({ children, closeModal }) {
  return (
    <ModalBackground>
      <ModalContent>
        {children}
        <CancelButton onClick={closeModal}>닫기</CancelButton>
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
  z-index: 1;
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
