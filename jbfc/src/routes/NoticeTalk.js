import axios from "axios";
import { useEffect, useState } from "react";
import "animate.css";
import Loading from "./Loading";
import api from "../api";

function NoticeTalk({ userId, socket, data, ChatComponents }) {
  const [chatData, setChatData] = useState(null);
  const [chatNewData, setChatNewData] = useState([]);

  const [
    Container,
    ChatContainer,
    InputContainer,
    ChatList,
    ChatComponentsTitle,
  ] = ChatComponents;

  // Notice에 해당하는 채팅목록을 가져와 chatData에 저장
  const getChatApi = () => {
    axios
      .post(`${api.BASE_URL}/chat`, {
        category: "Notice",
      })
      .then((res) => setChatData(res.data));
  };
  // 최초에 1회 채팅목록을 가져옴
  useEffect(() => {
    getChatApi();
  }, []);

  // 채팅 데이터를 DB에 저장
  const inputChatApi = (ChatValue) => {
    axios.post(`${api.BASE_URL}/chat/insertOne`, {
      userId: userId,
      message: ChatValue,
      category: "Notice",
    });
  };

  // socket을 사용하여 서버에 데이터를 보냄 그럼 서버는 모든 클라이언트에 데이터를 뿌려줄 수 있다.
  const emitMessage = (ChatValue) => {
    return new Promise((resolve, reject) => {
      socket.emit("send_message_notice", {
        userId: userId,
        message: ChatValue,
      });
    });
  };

  // 메세지를 socket을 이용해 서버에 전달한 후 Chat 리스트를 DB에 저장한다.
  const sendMessage = async (event) => {
    event.preventDefault();
    const ChatValue = event.currentTarget[0].value;
    emitMessage(ChatValue).then(inputChatApi(ChatValue));

    event.currentTarget[0].value = ``;
  };

  // 최초 1회 data(서버에서 온 데이터가 null이아니면)가 null이 아니면 chatNewData에 서버에서 온 data를 저장한다.
  // 리펙토링필요 newChat사용하지않아도 socket.on 사용하면될듯
  useEffect(() => {
    if (data !== null) {
      setChatNewData((current) => [...current, data]);
    }
  }, [data]);
  // 이게 둘다

  //chat data가 처음엔 null이잖아 그럼 data는? data는 user가 입력했을 때의 값이야
  //즉 user가 입력은 했는데 chat data는 null이면 ?

  return (
    <>
      {chatData === null ? (
        <Loading></Loading>
      ) : (
        <Container>
          <ChatContainer>
            <ChatComponentsTitle>NOTICE TALK</ChatComponentsTitle>
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

export default NoticeTalk;
