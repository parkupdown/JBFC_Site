import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
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

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input placeholder="제목" />
        <input placeholder="내용" />
        <button>제출</button>
      </form>
    </div>
  );
}
export default BoardWrite;
