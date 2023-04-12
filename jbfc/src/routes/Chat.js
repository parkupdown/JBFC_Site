import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import FreeTalk from "./FreeTalk";
import LoginBarrier from "./LoginBarrier";
import NoticeTalk from "./NoticeTalk";
import styled, { createGlobalStyle } from "styled-components";

function Chat() {
  const socket = io.connect(`http://localhost:8080`);
  const userId = localStorage.getItem(`userId`);
  const [noticeChat, setNoticeChat] = useState(null);
  const [freeChat, setFreeChat] = useState(null);

  const navigator = useNavigate();

  useEffect(() => {
    socket.on(`broadcast_notice`, (data) => {
      setNoticeChat(data);
    });

    socket.on(`broadcast_free`, (data) => {
      setFreeChat(data);
    });
  }, []);

  const goBack = () => {
    navigator(-1);
  };

  const Title = styled.h1`
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #0288d1;
  `;

  const Button = styled.button`
    padding: 1rem 2rem;
    background-color: #03a9f4;
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

  return (
    <>
      <ButtonContainer>
        <Title>JJACK Talk</Title>
        <div>
          <Button onClick={goBack}>뒤로가기</Button>
          <Link to={`/chat/Notice`}>
            <Button>NoticeTalk</Button>
          </Link>
          <Link to={`/chat/Free`}>
            <Button>FreeTalk</Button>
          </Link>
        </div>
      </ButtonContainer>

      <Routes>
        <Route
          path="Notice"
          element={
            <NoticeTalk userId={userId} socket={socket} data={noticeChat} />
          }
        />
        <Route
          path="Free"
          element={<FreeTalk userId={userId} socket={socket} data={freeChat} />}
        />
      </Routes>
    </>
  );
}

export default Chat;
