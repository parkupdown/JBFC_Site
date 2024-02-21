import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Comment from "../Comment/Comment";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoardDetailContainer = styled.div`
  width: 50vw;
  height: 30vh;
  padding: 20px;
  border-radius: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default function BoardDetail() {
  const { boardId } = useParams();

  const [boardDetailData, setBoardDetailData] = useState([]);
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  };
  const goBack = () => {
    navigate(-1);
  };
  const checkAuthorization = async () => {
    try {
      await axios.get("http://localhost:3060/token", {
        withCredentials: true,
      });
    } catch (error) {
      throw new Error("세션이 만료되었습니다.");
    }
  };

  const getBoardDetailData = async () => {
    const data = await axios.get(
      `http://localhost:3060/board/detail/${boardId}`
    );
    const boardData = data.data[0];
    setBoardDetailData(boardData);
  };

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        await checkAuthorization();
      } catch (error) {
        alert(error);
        goLogin();
      }
    };
    checkUserSession();
    getBoardDetailData();
  }, []);

  // boardId에 댓글을 쓰면?
  // 해당 게시글의 댓글이 자신의 id로 적히는 것
  // 그럼 나는 댓글 Table에 boardId에 대한 게시글을 작성을 하고
  // boardId는 FK값이되고 얘의 PK값의 board 테이블의 PK값이네

  return (
    <Container>
      <BoardDetailContainer>
        {boardDetailData.thumbnail === null ? null : (
          <img
            src={`http://localhost:3060/image/${boardDetailData.thumbnail}`}
          />
        )}
      </BoardDetailContainer>
      <h2>{boardDetailData.title}</h2>
      <p>{boardDetailData.content}</p>

      <span>
        작성자{boardDetailData.user_id} -{boardDetailData.time}
      </span>
      <Comment boardId={boardId} writer={boardDetailData.user_id} />
      <button onClick={goBack}>뒤로가기</button>
    </Container>
  );
}
