import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginBarrier from "./LoginBarrier";

function Board() {
  const userId = localStorage.getItem(`userId`);
  const [boardData, setBoardData] = useState(null);
  const CallBoardApi = () => {
    axios
      .get(`http://localhost:8080/board`)
      .then((res) => setBoardData(res.data));
  };

  useEffect(() => {
    CallBoardApi();
  }, [boardData]);

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
      .then((res) => setBoardData(res.data));
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
        {boardData === null ? (
          <h1>로딩중입니다.</h1>
        ) : (
          <ul>
            {boardData
              ? boardData.map((data) => (
                  <Link to={`/board/${data._id}`}>
                    <div key={data._id}>
                      <li>
                        <h2>{data.title}</h2>
                        <h4>작성자: {data.userId}</h4>
                        <h3>작성일: {data.nowTime}</h3>
                        <hr></hr>
                      </li>
                    </div>
                  </Link>
                ))
              : null}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Board;
