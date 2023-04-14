import axios from "axios";
import { useEffect, useState } from "react";
import "animate.css";
import Loading from "./Loading";

function FreeTalk({ userId, socket, data, ChatComponents }) {
  const [chatData, setChatData] = useState(null);
  const [chatNewData, setChatNewData] = useState([]);
  const [
    Container,
    ChatContainer,
    InputContainer,
    ChatList,
    Ment,
    ChatComponentsTitle,
  ] = ChatComponents;

  const GetChatApi = () => {
    axios
      .post(`http://localhost:8080/chat`, {
        category: "Free",
      })
      .then((res) => setChatData(res.data));
  };

  useEffect(() => {
    GetChatApi();
  }, []);

  const CallChatApi = (ChatValue) => {
    axios.post(`http://localhost:8080/chat/insertOne`, {
      userId: userId,
      message: ChatValue,
      category: "Free",
    });
  };
  const emitMessage = (ChatValue) => {
    return new Promise((resolve, reject) => {
      socket.emit("send_message_free", { userId: userId, message: ChatValue });
    });
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const ChatValue = event.currentTarget[0].value;
    emitMessage(ChatValue).then(CallChatApi(ChatValue));
    //이때 입력한 것들은 보내짐
    event.currentTarget[0].value = ``;
  };

  useEffect(() => {
    if (data !== null) {
      setChatNewData((current) => [...current, data]);
    }
  }, [data]);

  // 이게 아니라 setState에 들어갔던 것이 나오도록해야할듯
  //이부분이 잘못됨

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
