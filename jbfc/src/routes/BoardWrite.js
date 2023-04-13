import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";

const BoardWriteWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

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
  height: 500px;
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
  const [category, setCategory] = useState("free");

  const afterSubmit = () => {
    swal(
      "작성이 완료되었습니다.",
      "게시글 삭제는 내가 쓴 글에서 삭제 가능합니다. 게시글로 돌아갑니다.",
      "success"
    );
    navigator(`/board`);
  };
  const selectChange = (event) => {
    const categoryOfBoard = event.currentTarget.value;
    setCategory(categoryOfBoard);
  };

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
      .post(`http://localhost:8080/board/write`, {
        userId: userId,
        title: title,
        contents: contents,
        nowTime: nowTime,
        category: category,
      })
      .then(afterSubmit());

    event.currentTarget[0].value = ``;
    event.currentTarget[1].value = ``;
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
