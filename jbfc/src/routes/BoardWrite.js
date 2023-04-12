import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";

function BoardWrite() {
  const { state } = useLocation();
  // category 정보를받아옴
  const navigator = useNavigate();

  const afterSubmit = () => {
    swal("작성이 완료되었습니다.", "게시글로 돌아갑니다.", "success");
    navigator(`/board`);
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
        category: state,
      })
      .then(afterSubmit());

    event.currentTarget[0].value = ``;
    event.currentTarget[1].value = ``;
  };

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

  return (
    <div>
      <BackButton onClick={goBack}>뒤로가기</BackButton>
      <form onSubmit={onSubmit}>
        <input placeholder="제목" />
        <input placeholder="내용" />
        <button>제출</button>
      </form>
    </div>
  );
}
export default BoardWrite;
