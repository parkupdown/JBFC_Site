import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import FreeTalk from "./FreeTalk";
import NoticeTalk from "./NoticeTalk";

function Chat() {
  const socket = io.connect(`http://localhost:8080`);
  const userId = localStorage.getItem(`userId`);
  const [noticeChat, setNoticeChat] = useState(null);
  const [freeChat, setFreeChat] = useState(null);

  useEffect(() => {
    socket.on(`broadcast_notice`, (data) => {
      setNoticeChat(data);
    });

    socket.on(`broadcast_free`, (data) => {
      setFreeChat(data);
    });
  }, []);

  return (
    <div>
      <h1>짝발란스Talk</h1>
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
