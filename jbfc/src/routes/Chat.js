import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import FreeTalk from "./FreeTalk";
import LoginBarrier from "./LoginBarrier";
import NoticeTalk from "./NoticeTalk";
import styled, { createGlobalStyle } from "styled-components";
import ChatComponents from "./ChatComponents";
import api from "../api";

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #3b5998;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #3b5998;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 1rem;
  border: none;

  &:hover {
    background-color: #01579b;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  top: 0;
  background-color: #f2f2f2;
  padding: 1rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
`;

function Chat() {
  const socket = io.connect(`${api.BASE_URL}`);
  const userId = localStorage.getItem(`userId`);
  const [noticeChat, setNoticeChat] = useState(null);
  const [freeChat, setFreeChat] = useState(null);
  const [toggle, setToggle] = useState(true);
  const navigator = useNavigate();

  // Submit 버튼의 disable을 조절하기 위해 토글 함수
  const clickToggle = () => {
    setToggle((current) => !current);
  };

  // 페이지가 1회 로딩시 socket으로부터 실시간 서버의 데이터를 받아와 noticeChat과 freeChat에 저장한다.
  // 이는 서버에서 데이터를 보낼때(양방향통신) 마다 데이터를 변화시킬 수 있다.
  useEffect(() => {
    socket.on(`broadcast_notice`, (data) => {
      setNoticeChat(data);
    });
    socket.on(`broadcast_free`, (data) => {
      setFreeChat(data);
    });

    navigator(`/chat/Notice`);
  }, []);

  //chat에 필요한 컴포넌트를 불러온다.
  const chatComponents = ChatComponents();

  {
    return userId === null ? (
      <LoginBarrier></LoginBarrier>
    ) : (
      <>
        <ButtonContainer>
          <Title>JJACK Talk</Title>
          <div>
            <Link to={`/home`}>
              <Button>뒤로가기</Button>
            </Link>
            <Link to={`/chat/Notice`}>
              <Button onClick={clickToggle} disabled={toggle}>
                NoticeTalk
              </Button>
            </Link>
            <Link to={`/chat/Free`}>
              <Button onClick={clickToggle} disabled={!toggle}>
                FreeTalk
              </Button>
            </Link>
          </div>
        </ButtonContainer>

        <Routes>
          <Route
            path="Notice"
            element={
              <NoticeTalk
                userId={userId}
                socket={socket}
                data={noticeChat}
                ChatComponents={chatComponents}
              />
            }
          />
          <Route
            path="Free"
            element={
              <FreeTalk
                userId={userId}
                socket={socket}
                data={freeChat}
                ChatComponents={chatComponents}
              />
            }
          />
        </Routes>
      </>
    );
  }
}

export default Chat;
