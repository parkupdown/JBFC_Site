import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginBarrier from "./LoginBarrier";
import styled from "styled-components";
import Loading from "./Loading";

const Title = styled.h3`
  text-align: center;
  font-size: 36px;
  margin-bottom: 16px;
  color: #3b5998;
  font-weight: 400;
  margin-top: 30px;
`;

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

const Wrapper = styled.div`
  background-color: #f0f2f5;
  margin: 0 auto;
  padding: 20px;
  max-width: 960px;

  h1 {
    font-size: 24px;
    margin: 0;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }

  select {
    margin-left: 5px;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #fff;
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
    option {
      color: #333;
      background-color: #fff;
      display: flex;
      white-space: pre;
      min-height: 20px;
      padding: 0px 2px 1px;
    }
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 20px;
    background-color: #fff;

    a {
      text-decoration: none;
      color: #333;

      h2 {
        margin-bottom: 10px;
      }
    }

    h3,
    h4 {
      margin-top: 13px;
      color: #777;
      font-size: 14px;
    }

    h3 {
      margin-top: 10px;
    }

    hr {
      margin-top: 20px;
      margin-bottom: 10px;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1877f2;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    margin-top: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #166fe5;
    }

    &:active {
      background-color: #146fd1;
    }
  }

  h4 {
    margin: 0;
    font-size: 18px;
    color: #1877f2;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: #166fe5;
    }
  }
`;
const BoardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Category = styled.div`
  font-size: 18px;
  margin-right: 10px;
  color: #1877f2;
  background-color: #fff;
  padding: 5px 40px;
  border-radius: 5px;

  text-align: center;
`;

const BoardContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
`;

function Board() {
  const userId = localStorage.getItem(`userId`);
  const [boardData, setBoardData] = useState(null);
  const [category, setCategory] = useState(`free`);

  const CallBoardApi = (categoryOfBoard) => {
    axios
      .post(`https://jjb.jjackbalance.info/board`, {
        category: categoryOfBoard,
      })
      .then((res) => setBoardData(res.data))
      .catch((error) => alert(error));
  };

  useEffect(() => {
    CallBoardApi(category);
  }, [category]);

  const selectChange = (event) => {
    const categoryOfBoard = event.currentTarget.value;
    setCategory(categoryOfBoard);
    CallBoardApi(categoryOfBoard);
  };
  //선택한 카테고리에 따라 해당하는 게시글을 보여주도록함

  return userId === null ? (
    <LoginBarrier />
  ) : (
    <BoardContainer>
      <Title>JJACK BALANCE</Title>
      <Wrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Link to={`/home`}>
            <BackButton>뒤로가기</BackButton>
          </Link>
          <Link to={`/board/write`} state={category}>
            <button>글 작성</button>
          </Link>
          <Link to={`/board/mine`}>
            <button>내가 쓴 글</button>
          </Link>
        </div>
        <div>
          <BoardWrapper>
            <select onChange={selectChange} value={category}>
              <option value="free">자유 게시판</option>
              <option value="match">매칭 게시판</option>
              <option value="sentimental">센치..게시판..</option>
            </select>
            <Category>{category}</Category>
          </BoardWrapper>
          {boardData === null ? (
            <Loading></Loading>
          ) : (
            <ul>
              {boardData
                ? boardData.map((data, index) => (
                    <Link to={`/board/${data._id}`}>
                      <div key={index}>
                        <li key={index}>
                          <h2>{data.title}</h2>
                          <h4>작성자: {data.userId}</h4>
                          <h3>작성일: {data.nowTime}</h3>
                          <h3>카테고리: {data.category} </h3>
                          <hr></hr>
                        </li>
                      </div>
                    </Link>
                  ))
                : null}
            </ul>
          )}
        </div>
      </Wrapper>
    </BoardContainer>
  );
}

export default Board;
