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

  const clickToggle = () => {
    setToggle((current) => !current);
  };

  useEffect(() => {
    socket.on(`broadcast_notice`, (data) => {
      setNoticeChat(data);
    });
    socket.on(`broadcast_free`, (data) => {
      setFreeChat(data);
    });

    navigator(`/chat/Notice`);
  }, []);

  const chatComponents = ChatComponents();
  // chatComponens를 불러옴
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
