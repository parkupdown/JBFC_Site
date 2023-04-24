import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import api from "../api";

const BoardWriteWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  height: 100%;

  form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    font-size: 16px;
    outline: none;
  }

  input::placeholder {
    color: #999;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 350px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  line-height: 1.5;
  resize: none;
  margin-bottom: 50px;

  &:focus {
    outline: none;
    border-color: #4267b2;
  }
`;

const BackButton = styled.button`
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
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1877f2;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 30px 60px;
  margin-top: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #166fe5;
  }

  &:active {
    background-color: #146fd1;
  }
`;

const SelectCategory = styled.select`
  margin-left: 0px;
  margin-top: 20px;
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
`;

function BoardWrite() {
  const navigator = useNavigate();
  //카테고리의 기본 값은 "free"로 향하게 둔다.
  const [category, setCategory] = useState("free");

  // select 태그에 변화가 생기면 category의 값을 변경시킨다.
  const selectChange = (event) => {
    const categoryOfBoard = event.currentTarget.value;
    setCategory(categoryOfBoard);
  };
  // 작성이 완료되면 작성이 완료되었다는 문구와 함께 2초 후 게시글이 있는 Board 컴포넌트를 렌더링한다.
  const afterSubmit = () => {
    swal(
      "작성이 완료되었습니다.",
      "게시글 삭제는 내가 쓴 글에서 삭제 가능합니다.      2초 뒤 게시글로 돌아갑니다.",
      "success"
    );
    setTimeout(() => navigator(`/board`), 2000);
  };

  //DB에 Board에 작성할 데이터를 넣는다.
  const inputBoardWriteApi = (userId, title, contents, nowTime) => {
    axios
      .post(`${api.BASE_URL}/board/write`, {
        userId: userId,
        title: title,
        contents: contents,
        nowTime: nowTime,
        category: category,
      })
      .then(afterSubmit());
  };

  // Input을 리셋하는 함수
  const resetInput = (event) => {
    event.currentTarget[0].value = ``;
    event.currentTarget[1].value = ``;
  };

  // form이 submit 되었을 때 DB데이터 저장 및 input reset을 실행하는 함수
  const onSubmit = (event) => {
    event.preventDefault();

    const userId = localStorage.getItem(`userId`);
    const title = event.currentTarget[0].value;
    const contents = event.currentTarget[1].value;
    const time = new Date();
    const nowTime = `${
      time.getMonth() + 1
    }월 ${time.getDate()}일 ${time.getHours()}시 ${time.getMinutes()}분`;

    inputBoardWriteApi(userId, title, contents, nowTime);
    resetInput(event);
  };

  const goBack = () => {
    navigator("/board");
  };

  return (
    <BoardWriteWrapper>
      <BackButton onClick={goBack}>뒤로가기</BackButton>
      <SelectCategory onChange={selectChange}>
        <option value="free">자유 게시판</option>
        <option value="match">매칭 게시판</option>
        <option value="sentimental">센치..게시판..</option>
      </SelectCategory>
      <form onSubmit={onSubmit}>
        <input placeholder="제목" />
        <TextArea placeholder="내용" />
        <SubmitButton>제출</SubmitButton>
      </form>
    </BoardWriteWrapper>
  );
}
export default BoardWrite;
