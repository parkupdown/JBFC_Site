import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  color: #333;
`;

const ChatContainer = styled.div`
  margin-top: 0px;
  height: 650px;
  overflow-y: scroll;
  flex-direction: column-reverse;
  display: flex;
`;

const ScrollBar = styled.div`
  width: 20px;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin: 5px;
`;

const Thumb = styled.div`
  width: 10px;
  background-color: #555;
  border-radius: 10px;
  cursor: pointer;
`;

const Track = styled.div`
  width: 10px;
  background-color: #f2f2f2;
  border-radius: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  input {
    flex: 1;
    margin-right: 1rem;
    padding: 0.5rem;
    border-radius: 4px;
    border: none;
  }

  button {
    background-color: #03a9f4;
    color: #fff;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #01579b;
    }
  }
`;

const ChatList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin-left: 1rem;
    margin-bottom: 0.5rem;
    align-items: end;
  }
`;

const Ment = styled.h1`
  margin-top: 30px;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #0288d1;
  text-align: center;
`;

function FreeTalk({ userId, socket, data }) {
  const [chatData, setChatData] = useState(null);
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
      chatData: ChatValue,
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

  // 이게 아니라 setState에 들어갔던 것이 나오도록해야할듯
  //이부분이 잘못됨

  return (
    <Container>
      {chatData === null ? (
        <div>
          <h3>"로딩중"</h3>
          <ChatList></ChatList>
        </div>
      ) : (
        <ChatContainer>
          <InputContainer onSubmit={sendMessage}>
            <input placeholder="채팅" />
            <button>보내기</button>
          </InputContainer>

          <ChatList>
            {chatData === null
              ? null
              : chatData.map((data, index) => (
                  <li key={index}>{`${data.userId}: ${data.chatData}`}</li>
                ))}
          </ChatList>
        </ChatContainer>
      )}
      <Ment>바른 채팅</Ment>
    </Container>
  );
}

export default FreeTalk;
