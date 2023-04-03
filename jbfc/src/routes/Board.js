import axios from "axios";
import LoginBarrier from "./LoginBarrier";

function Board() {
  const userId = localStorage.getItem(`userId`);

  const onSubmit = (event) => {
    event.preventDefault();
    const userId = localStorage.getItem(`userId`);
    const title = event.currentTarget[0].value;
    const contents = event.currentTarget[1].value;
    const time = new Date();
    const nowTime = `${
      time.getMonth() + 1
    }월 ${time.getDate()}일 ${time.getHours()}시 ${time.getMinutes()}분`;

    axios
      .post(`http://localhost:8080/board`, {
        userId: userId,
        title: title,
        contents: contents,
        nowTime: nowTime,
      })
      .then((res) => console.log(res));
  };

  return userId === null ? (
    <LoginBarrier />
  ) : (
    <div>
      <h1>게시판입니다.</h1>
      <div>
        <form onSubmit={onSubmit}>
          <input placeholder="제목" />
          <input placeholder="내용" />
          <button>제출</button>
        </form>
      </div>
    </div>
  );
}

export default Board;
