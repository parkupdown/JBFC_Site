import axios from "axios";
import { useEffect, useState } from "react";

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
      socket.emit("send_message_free", { message: ChatValue });
    });
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const ChatValue = event.currentTarget[0].value;
    emitMessage(ChatValue).then(CallChatApi(ChatValue));
    //이때 입력한 것들은 보내짐
    event.currentTarget[0].value = ``;
  };

  if (data !== null) {
    const Ul = document.querySelector("ul");
    console.log(Ul);
    const li = document.createElement("li");
    Ul.appendChild(li);
    li.innerHTML = `${data.userId}: ${data.message}`;
  }

  return (
    <div>
      <h2>자유톡📢</h2>
      {chatData === null ? (
        <div>
          <h3>"로딩중"</h3>
          <ul></ul>
        </div>
      ) : (
        <div
          style={{
            width: "200px",
            height: "300px",
            overflow: "auto",
            flexDirection: "column-reverse",
            display: "flex",
          }}
        >
          <form onSubmit={sendMessage}>
            <input placeholder="채팅" />
            <button>보내기</button>
          </form>
          <ul>
            {chatData === null
              ? null
              : chatData.map((data, index) => (
                  <li key={index}>{`${data.userId}: ${data.chatData}`}</li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FreeTalk;
