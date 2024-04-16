import styled from "styled-components";

export default function Alert({ okCallback, noCallback, target }) {
  return (
    <AlertBackground>
      <AlertContent>
        <span>{target}을(를) 삭제하시겠습니까?</span>
        <div className="buttonBox">
          <button onClick={okCallback}>확인</button>
          <button onClick={noCallback}>취소</button>
        </div>
      </AlertContent>
    </AlertBackground>
  );
}

const AlertBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 2;
`;

const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  overflow-y: scroll;
  .buttonBox {
    button {
      color: #516fd4;
      background-color: #fbfcff;
      border: 0.5px solid #eeeeee;
      padding: 5px;
      margin: 5px 10px;
    }
  }
`;
