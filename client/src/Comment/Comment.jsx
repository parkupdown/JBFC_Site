import axios from "axios";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";

export default function Comment({ boardId, writer }) {
  const getTime = () => {
    const date = new Date();
    return `${date.getMonth()}월 ${date.getDay()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
  };
  const queryClient = useQueryClient();
  const insertCommentData = async (e) => {
    e.preventDefault();
    const content = e.target[0].value;
    const time = getTime();
    const commentData = {
      board_id: boardId,
      content: content,
      writer: writer,
      time: time,
    };
    await axios.post(`http://localhost:3060/comment`, commentData);
    //작성하면 캐싱데이터를 다시 불러올수있게?
    queryClient.setQueryData(`comment${boardId}`, (prev) => {
      return [...prev, commentData];
    });
    // 캐싱 데이터 업데이트
    alert("작성완료");
    e.target[0].value = ``;
    //input 초기화
  };

  const getCommentData = async () => {
    const getdata = await axios.get(`http://localhost:3060/comment/${boardId}`);
    const commentData = getdata.data;
    return commentData;
  };

  const { isLoading, data } = useQuery(`comment${boardId}`, getCommentData);

  // 기본적으로 댓글 데이터 가져오기
  return (
    <div>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div>
          <form onSubmit={(e) => insertCommentData(e)}>
            <input placeholder="...comment" />
            <button>send</button>
          </form>
          <div>
            {data.map((comment) => (
              <div key={comment.id}>
                <p>{comment.writer}</p>
                <p>{comment.content}</p>
                <p>- {comment.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
