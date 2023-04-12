import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginBarrier from "./LoginBarrier";
import styled from "styled-components";

function Board() {
  const userId = localStorage.getItem(`userId`);
  const [boardData, setBoardData] = useState(null);
  const [category, setCategory] = useState(`free`);
  const navigator = useNavigate();

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

  const goBack = () => {
    navigator(-1);
  };

  const BackButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    font-size: 14px;
    color: #333;
    transition: all 0.2s ease;

    &:hover {
      background-color: #eee;
      border-color: #bbb;
    }

    &:active {
      background-color: #ddd;
      border-color: #999;
    }
  `;

  return userId === null ? (
    <LoginBarrier />
  ) : (
    <div>
      <BackButton onClick={goBack}>뒤로가기</BackButton>
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
