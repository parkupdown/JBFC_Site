import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import { httpClient } from "../../api/http";

export default function Comment({ boardId, writer }) {
  //여기서 writer는 게시글의 작성자
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
    const getData = await httpClient.post(`/comment`, commentData);
    //작성하면 캐싱데이터를 다시 불러올수있게?
    const newCommentData = getData.data;

    queryClient.setQueryData(`comment${boardId}`, () => {
      return newCommentData;
    });
    // 캐싱 데이터 업데이트
    alert("작성완료");
    e.target[0].value = ``;
    //input 초기화
  };

  const getCommentData = async () => {
    const getdata = await httpClient.get(`/comment/${boardId}`);
    const commentData = getdata.data;
    return commentData;
  };

  const { isLoading, data } = useQuery(`comment${boardId}`, getCommentData);

  const removeCommentData = async (commentId) => {
    await httpClient.delete(`/comment/${commentId}`);
    queryClient.setQueryData(`comment${boardId}`, (prev) => {
      const newData = prev.filter((data) => data.id !== commentId);
      return newData;
    });
  };

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
                {comment.writer === writer ? (
                  <button onClick={() => removeCommentData(comment.id)}>
                    댓글삭제
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
