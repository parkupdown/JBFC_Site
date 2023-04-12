import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import FreeTalk from "./FreeTalk";
import LoginBarrier from "./LoginBarrier";
import NoticeTalk from "./NoticeTalk";
import styled from "styled-components";

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

  const BackButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    font-size: 14px;
    color: #333;
    transition: all 0.2s ease;

    &:hover {
      background-color: #eee;
      border-color: #bbb;
    }

    &:active {
      background-color: #ddd;
      border-color: #999;
    }
  `;

  return userId === null ? (
    <LoginBarrier />
  ) : (
    <div>
      <h1>짝발란스Talk</h1>
      <BackButton onClick={goBack}>뒤로가기</BackButton>
      <Link to={`/chat/Notice`}>
        <button>NoticeTalk</button>
      </Link>
      <Link to={`/chat/Free`}>
        <button>FreeTalk</button>
      </Link>
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
    </div>
  );
}

export default Chat;
