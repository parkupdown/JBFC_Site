import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BoardDetail() {
  const { userId } = useParams();
  const userName = localStorage.getItem(`userId`);
  const [detail, setDetail] = useState(null);
  const [comment, setComment] = useState(null);
  const CallBoardDetailApi = () =>
    axios
      .post(`http://localhost:8080/boardDetail`, {
        userId: userId,
      })
      .then((res) => setDetail(res.data)); //수정필요

  const CallBoardCommentsApi = (userId, userName, inputValue) => {
    return axios
      .post(`http://localhost:8080/board/comment`, {
        userId: userId,
        userName: userName,
        comment: inputValue,
      })
      .then((res) => setComment(res.data));
  };

  const GetBoardCommentsApi = () => {
    return axios
      .post(`http://localhost:8080/board/comment/get`, {
        userId: userId,
        userName: userName,
      })
      .then((res) => setComment(res.data));
  };

  useEffect(() => {
    CallBoardDetailApi();
    GetBoardCommentsApi();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const inputValue = event.currentTarget[0].value;
    CallBoardCommentsApi(userId, userName, inputValue);
    event.currentTarget[0].value = ``;
  };

  return (
    <div>
      {detail === null || comment === null ? (
        <h1>로딩중입니당!</h1>
      ) : (
        <div>
          <ul>
            <li>
              <h2>{detail.title}</h2>
              <span>작성자: {detail.userId}</span>
              <h3>{detail.contents}</h3>
            </li>
          </ul>
          <form onSubmit={onSubmit}>
            <input placeholder="올바른 댓글 문화" />
            <button>💬</button>
          </form>
          <div>
            {comment.map((item) => (
              <li key={item._id}>{`${item.userName}: ${item.comment}`}</li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BoardDetail;
