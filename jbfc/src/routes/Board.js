import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginBarrier from "./LoginBarrier";

function Board() {
  const userId = localStorage.getItem(`userId`);
  const [boardData, setBoardData] = useState(null);
  const [category, setCategory] = useState(`free`);
  const CallBoardApi = (categoryOfBoard) => {
    axios
      .post(`http://localhost:8080/board`, {
        category: categoryOfBoard,
      })
      .then((res) => setBoardData(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    CallBoardApi(category);
  }, []);

  const selectChange = (event) => {
    const categoryOfBoard = event.currentTarget.value;
    setCategory(categoryOfBoard);
    CallBoardApi(categoryOfBoard);
  };
  //선택한 카테고리에 따라 해당하는 게시글을 보여주도록함

  return userId === null ? (
    <LoginBarrier />
  ) : (
    <div>
      <h1>모든 글</h1>
      <div>
        <select onChange={selectChange}>
          <option value="free">자유게시판</option>
          <option value="sentimental">센치할때..감성글..</option>
          <option value="match">매칭, 자체 공지</option>
        </select>
        <Link to={`/board/write`} state={category}>
          <h4>글 작성</h4>
        </Link>
        <Link to={`/board/mine`}>
          <button>내가 쓴 글</button>
        </Link>
        {boardData === null ? (
          <h1>로딩중입니다.</h1>
        ) : (
          <ul>
            {boardData
              ? boardData.map((data, index) => (
                  <div key={index}>
                    <li key={index}>
                      <Link to={`/board/${data._id}`}>
                        <h2>{data.title}</h2>
                      </Link>
                      <h4>작성자: {data.userId}</h4>
                      <h3>작성일: {data.nowTime}</h3>
                      <hr></hr>
                    </li>
                  </div>
                ))
              : null}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Board;
