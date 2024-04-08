import { useQuery } from "react-query";

import { httpClient } from "@/api/http";
import { queryClient } from "@/App";
import styled from "styled-components";
import { BsSendFill } from "react-icons/bs";
import { getTime } from "@/utils/getDate";
import { getNickName } from "@/store/nickNameStore";
import { useForm } from "react-hook-form";
import { useComment } from "@/hooks/useComment";
import { fetchDeleteComment, fetchPostComment } from "../../api/comment.api";

export default function Comment({ boardId }) {
  //여기서 writer는 게시글의 작성자
  const { comments, setComments } = useComment(boardId);
  const writer = getNickName();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { content } = data;
    const time = getTime();
    const commentData = {
      board_id: boardId,
      content: content,
      writer: writer,
      time: time,
    };
    const newComment = await fetchPostComment(commentData);
    //여기서는 현재 comment_id가 들어있지 않다.

    setComments(newComment);
  };

  const removeCommentData = async (commentId) => {
    await fetchDeleteComment(commentId);
    setComments((current) => current.filter((data) => data.id !== commentId));
  };

  // 기본적으로 댓글 데이터 가져오기
  return (
    <Container>
      {!comments && <div>로딩중</div>}
      {comments && (
        <div>
          <div>
            {comments.map((comment) => (
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Type your message here"
              {...register("content", {
                required: "최소 1글자는 입력해주세요",
              })}
            />

            <button>
              <BsSendFill />
            </button>
          </form>
          {errors && errors.content && <span> {errors.content.message}</span>}
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  margin-top: 30px;
  text-align: center;

  form {
    input {
      padding: 20px;
      background-color: #eeeeee;
      border: none;
      border-radius: 10px;
    }
    button {
      border: none;
      font-size: 24px;
      color: #516fd4;
      background-color: white;
      margin-left: 10px;
    }
  }
`;
