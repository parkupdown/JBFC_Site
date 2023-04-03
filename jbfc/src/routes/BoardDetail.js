import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BoardDetail() {
  const { userId } = useParams();
  const [detail, setDetail] = useState(null);
  const CallBoardDetailApi = () =>
    axios
      .post(`http://localhost:8080/boardDetail`, {
        userId: userId,
      })
      .then((res) => setDetail(res.data)); //수정필요

  useEffect(() => {
    CallBoardDetailApi();
  }, []);

  return (
    <div>
      {detail === null ? (
        <h1>로딩중입니당!</h1>
      ) : (
        <ul>
          <li>
            <h2>{detail.title}</h2>
            <span>작성자: {detail.userId}</span>
            <h3>{detail.contents}</h3>
          </li>
        </ul>
      )}
    </div>
  );
}

export default BoardDetail;
