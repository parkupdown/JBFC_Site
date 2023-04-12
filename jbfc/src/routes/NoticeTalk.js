import axios from "axios";
import { useEffect, useState } from "react";
import "animate.css";

function NoticeTalk({ userId, socket, data, ChatComponents }) {
  const [chatData, setChatData] = useState(null);
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
        category: "Notice",
      })
      .then((res) => setChatData(res.data));
  };

  useEffect(() => {
    GetChatApi();
  }, []);

  useEffect(() => {
    if (data !== null) {
      const Ul = document.querySelector("ul");
      const li = document.createElement("li");
      data.userId === userId
        ? (li.style.textAlign = "right")
        : (li.style.textAlign = "left");
      li.className = "animate__animated animate__bounceIn animate__faster";
      Ul.appendChild(li);
      li.innerHTML = `<span>${data.userId}: ${data.message}</span>`;
    }
  }, [data]); // 이게 둘다

  const CallChatApi = (ChatValue) => {
    axios.post(`http://localhost:8080/chat/insertOne`, {
      userId: userId,
      chatData: ChatValue,
      category: "Notice",
    });
  };

  const emitMessage = (ChatValue) => {
    return new Promise((resolve, reject) => {
      socket.emit("send_message_notice", {
        userId: userId,
        message: ChatValue,
      });
    });
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const ChatValue = event.currentTarget[0].value;
    emitMessage(ChatValue).then(CallChatApi(ChatValue));
    //이때 입력한 것들은 보내짐
    event.currentTarget[0].value = ``;
  };

  if (chatData === null) {
    return (
      <Container>
        <Ment>"로딩중"</Ment>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <ChatContainer>
          <ChatComponentsTitle>NOTICE TALK</ChatComponentsTitle>
          <InputContainer onSubmit={sendMessage}>
            <input placeholder="JJACK BALANCE" />
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
                <span>{`${data.userId}: ${data.chatData}`}</span>
              </li>
            ))}
          </ChatList>
        </ChatContainer>
      </Container>
    </>
  );
}

export default NoticeTalk;
