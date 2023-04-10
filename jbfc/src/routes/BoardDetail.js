import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

function BoardDetail() {
  const { userId } = useParams();
  const userName = localStorage.getItem(`userId`);
  const [detail, setDetail] = useState(null);
  const [comment, setComment] = useState(null);
  const time = new Date();
  const nowTime = `${
    time.getMonth() + 1
  }/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;

  const CallBoardDetailApi = () =>
    axios
      .post(`http://localhost:8080/boardDetail`, {
        userId: userId,
      })
      .then((res) => setDetail(res.data));
  //boardDetail Api에 userId를 보내서 useId와 일치하는 배열 데이터를 찾아옴

  const CallBoardCommentsApi = (userId, userName, inputValue) => {
    return axios
      .post(`http://localhost:8080/board/comment`, {
        userId: userId,
        userName: userName,
        comment: inputValue,
        time: nowTime,
      })
      .then((res) => setComment(res.data));
  }; //submit하면 댓글정보를 보낼 수 있도록함

  const GetBoardCommentsApi = () => {
    return axios
      .post(`http://localhost:8080/board/comment/get`, {
        userId: userId,
        userName: userName,
      })
      .then((res) => setComment(res.data));
  };
  // 위 페이지에 들어오면 댓글정보를 볼 수 있게 API를 최초에 1회 호출함

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

  const commentRemove = (event, userName, commentName, id) => {
    if (userName !== commentName) {
      return swal(
        "오류발생",
        "본인이 작성한 댓글만 삭제할 수 있습니다.",
        "warning"
      );
    }

    axios.delete(`http://localhost:8080/board/mine/comment/delete`, {
      data: { userName: userName, _id: id },
    });
    const listId = event.currentTarget.parentElement.id;
    setComment((current) => {
      const newMine = current.filter(
        (item, index) => index !== parseInt(listId)
      );

      return newMine;
    });
    swal("성공", "댓글 삭제가 완료되었습니다.", "success");
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
            {comment.map((item, index) => (
              <li id={index} key={item._id}>
                {`${item.time} ${item.userName}: ${item.comment}`}
                <button
                  onClick={(event) =>
                    commentRemove(event, userName, item.userName, item._id)
                  }
                  //실제 userName(로그인 정보상 userName이 들어감)
                >
                  댓글삭제
                </button>
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BoardDetail;
