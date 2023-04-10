import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function BoardMine() {
  const userId = localStorage.getItem(`userId`);
  const [mine, setMine] = useState(null);
  const CallBoardMineApi = () => {
    return axios
      .post(`http://localhost:8080/board/mine`, {
        userId: userId,
      })
      .then((res) => setMine(res.data));
  };

  useEffect(() => {
    CallBoardMineApi();
  }, []);

  const onClick = (event, userId) => {
    axios.delete(`http://localhost:8080/board/mine/delete`, {
      data: { userId: userId },
    });
    //delete는 데이터를 넣어주는 방법이 다르다!

    const listId = event.currentTarget.parentElement.id;
    setMine((current) => {
      const newMine = current.filter(
        (item, index) => index !== parseInt(listId)
      );
      return newMine;
    });

    swal("성공", "게시글 삭제가 완료되었습니다.", "success");
  };

  return (
    <div>
      {mine === null ? (
        <h2>로딩중입니당</h2>
      ) : (
        <ul>
          {mine.map((data, index) => (
            <div key={index}>
              <li id={index} key={index}>
                <button onClick={(event) => onClick(event, data._id)}>
                  삭제❌
                </button>
                <Link to={`/board/${data._id}`}>
                  <h2>{data.title}</h2>
                </Link>
                <h4>작성자: {data.userId}</h4>
                <h3>작성일: {data.nowTime}</h3>
                <h3>카테고리: {data.category}</h3>
                <hr></hr>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
export default BoardMine;
