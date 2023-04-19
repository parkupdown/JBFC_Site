import axios from "axios";
import { useEffect, useState } from "react";
import "animate.css";
import Loading from "./Loading";

function NoticeTalk({ userId, socket, data, ChatComponents }) {
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
      .post(`https://jjackbalance.info/chat`, {
        category: "Notice",
      })
      .then((res) => setChatData(res.data));
  }; //여기서 최초 정보를 가져옴

  useEffect(() => {
    GetChatApi();
  }, []);

  const CallChatApi = (ChatValue) => {
    axios.post(`https://jjackbalance.info/chat/insertOne`, {
      userId: userId,
      message: ChatValue,
      category: "Notice",
    });
  }; //여기서 데이터를 DB에 넣어준다.

  const emitMessage = (ChatValue) => {
    return new Promise((resolve, reject) => {
      socket.emit("send_message_notice", {
        userId: userId,
        message: ChatValue,
      });
    });
  }; //여기서 socket에 보내면

  const sendMessage = async (event) => {
    event.preventDefault();
    const ChatValue = event.currentTarget[0].value;
    emitMessage(ChatValue).then(CallChatApi(ChatValue));

    //이때 입력한 것들은 보내짐 이때 ChatApi를 통해 저장이됨 그럼 그 값을 가져온 다음 그 값을 바로 넣어주면 되자나
    event.currentTarget[0].value = ``;
  };

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
