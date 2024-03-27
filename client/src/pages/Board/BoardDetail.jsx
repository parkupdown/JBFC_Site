import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Comment from "../Comment/Comment";
import { httpClient } from "../../api/http";

export default function BoardDetail() {
  const { boardId } = useParams();
  const [boardDetailData, setBoardDetailData] = useState([]);
  const getBoardDetailData = async () => {
    const data = await httpClient.get(`/board/detail/${boardId}`);
    const boardData = data.data[0];
    setBoardDetailData(boardData);
  };

  useEffect(() => {
    getBoardDetailData();
  }, []);

  // boardId에 댓글을 쓰면?
  // 해당 게시글의 댓글이 자신의 id로 적히는 것
  // 그럼 나는 댓글 Table에 boardId에 대한 게시글을 작성을 하고
  // boardId는 FK값이되고 얘의 PK값의 board 테이블의 PK값이네

  return (
    <Container>
      <BoardDetailContainer>
        {boardDetailData.thumbnail && (
          <img
            src={`http://localhost:3060/image/${boardDetailData.thumbnail}`}
          />
        )}
      </BoardDetailContainer>
      <h2>{boardDetailData.title}</h2>
      <p>{boardDetailData.content}</p>

      <span>
        작성자{boardDetailData.nickname} -{boardDetailData.time}
      </span>
      <Comment boardId={boardId} writer={boardDetailData.nickname} />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoardDetailContainer = styled.div`
  width: 30vw;

  @media (max-width: 860px) {
    width: 50vw;
  }
  height: 30vh;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
