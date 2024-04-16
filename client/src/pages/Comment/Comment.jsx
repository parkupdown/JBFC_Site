import styled from "styled-components";
import { BsSendFill } from "react-icons/bs";
import { getTime } from "@/utils/getDate";
import { getNickName } from "@/store/nickNameStore";
import { useForm } from "react-hook-form";
import { useComment } from "@/hooks/useComment";
import { fetchDeleteComment, fetchPostComment } from "@/api/comment.api";
import { Error } from "../../components/common/Error";

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
              <div className="comment" key={comment.id}>
                <div className="whoMake">
                  <span className="writer">{comment.writer}</span>
                  <span className="time"> {comment.time}</span>
                </div>
                <span className="content">{comment.content}</span>
                {comment.writer === writer ? (
                  <span
                    className="deleteButton"
                    onClick={() => removeCommentData(comment.id)}
                  >
                    댓글삭제
                  </span>
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
          {errors && errors.content && (
            <Error message={errors.content.message}></Error>
          )}
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
      background-color: ${({ theme }) => theme.backgroundColor.input};
      border: none;
      border-radius: 10px;
      margin-top: 30px;
    }
    button {
      border: none;
      font-size: 24px;
      color: ${({ theme }) => theme.color.positive};
      background-color: ${({ theme }) => theme.backgroundColor.main};
      margin-left: 10px;
      padding: 8px;
      border-radius: 10px;
    }
  }
  .comment {
    display: flex;
    flex-direction: column;
    align-items: start;

    margin-bottom: 10px;
    .whoMake {
      font-size: 12px;
      .writer {
        font-weight: 600;
      }
      .time {
        font-weight: 250;
        opacity: 0.7;
      }
    }
    .content {
      font-weight: 250;
      opacity: 0.7;
    }
    .deleteButton {
      border: ${({ theme }) => theme.border.main};
      border-radius: 7px;
      color: ${({ theme }) => theme.color.negative};
      padding: 5px;
      font-size: 12px;
    }
  }
`;
