import axios from "axios";
import { useEffect, useState } from "react";
import "animate.css";
import Loading from "./Loading";
import api from "../api";

function FreeTalk({ userId, socket, data, ChatComponents }) {
  const [chatData, setChatData] = useState(null);
  const [chatNewData, setChatNewData] = useState([]);

  //Chat styled-components를 가져온다.
  const [
    Container,
    ChatContainer,
    InputContainer,
    ChatList,
    ChatComponentsTitle,
  ] = ChatComponents;

  // "Free" 카테고리에 있는 채팅 목록을 가져온 후 chatdata에 저장한다.
  const getChatApi = () => {
    axios
      .post(`${api.BASE_URL}/chat`, {
        category: "Free",
      })
      .then((res) => setChatData(res.data));
  };

  //최초 1회 채팅 목록을 가져온다.
  useEffect(() => {
    getChatApi();
  }, []);

  // 채팅에 필요한 데이터를 DB에 저장한다.
  const callChatApi = (ChatValue) => {
    axios.post(`${api.BASE_URL}/chat/insertOne`, {
      userId: userId,
      message: ChatValue,
      category: "Free",
    });
  };

  // 채팅 된 내용을 서버에 보내 서버에서 다시 모든 클라이언트로 데이터를 전송하도록한다.
  // 소켓을 사용하여 양방향통신을 위한 트리거가 된다.
  const emitMessage = (ChatValue) => {
    return new Promise((resolve, reject) => {
      socket.emit("send_message_free", { userId: userId, message: ChatValue });
    });
  };

  // 메세지를 서버에 전달하고 DB에 전달 후 input을 리셋한다.
  const sendMessage = async (event) => {
    event.preventDefault();
    const ChatValue = event.currentTarget[0].value;
    emitMessage(ChatValue).then(callChatApi(ChatValue));
    //이때 입력한 것들은 보내짐
    event.currentTarget[0].value = ``;
  };

  //최초 1회 data가 null이 아니면 data를 newchat에 저장한다.
  // 이때 Data는 상위 컴포넌트(Chat)에서 가져온 실시간 채팅 데이터가 된다.
  useEffect(() => {
    if (data !== null) {
      setChatNewData((current) => [...current, data]);
    }
  }, [data]);

  return (
    <>
      {chatData === null ? (
        <Loading></Loading>
      ) : (
        <Container>
          <ChatContainer>
            <ChatComponentsTitle>FREE TALK</ChatComponentsTitle>
            <InputContainer onSubmit={sendMessage}>
              <input autoFocus placeholder="JJACK BALANCE" />
              <button>보내기</button>
            </InputContainer>

            <ChatList>
              {chatData.map((data, index) => (
                <li
                  key={index}
                  style={{
                    textAlign: data.userId === userId ? "right" : "left",
                  }}
                >
                  <span>{`${data.userId}: ${data.message}`}</span>
                </li>
              ))}
              {chatNewData.map((data, index) => (
                <li
                  className={
                    index === chatNewData.length - 1
                      ? "animate__animated animate__bounceIn animate__faster"
                      : null
                  }
                  key={index}
                  style={{
                    textAlign: data.userId === userId ? "right" : "left",
                  }}
                >
                  <span>{`${data.userId}: ${data.message}`}</span>
                </li>
              ))}
            </ChatList>
          </ChatContainer>
        </Container>
      )}
    </>
  );
}

export default FreeTalk;
