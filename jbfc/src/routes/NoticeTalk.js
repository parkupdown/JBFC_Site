import { useEffect } from "react";

function NoticeTalk({ userId, socket, data }) {
  const sendMessage = (event) => {
    event.preventDefault();
    const ChatValue = event.currentTarget[0].value;
    socket.emit("send_message_notice", { message: ChatValue });
    //이때 입력한 것들은 보내짐
    event.currentTarget[0].value = ``;
  };

  if (data !== null) {
    const Ul = document.querySelector("ul");
    const li = document.createElement("li");
    Ul.appendChild(li);
    li.innerHTML = `${userId}: ${data.message}`;
  }

  return (
    <div>
      <h2>공지톡📢</h2>
      <div
        style={{
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
        <ul></ul>
      </div>
    </div>
  );
}
export default NoticeTalk;
