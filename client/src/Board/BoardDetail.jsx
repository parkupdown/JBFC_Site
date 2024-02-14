import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

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
  const { boardId } = useLocation().state;
  const [boardDetailData, setBoardDetailData] = useState([]);
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
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
    </Container>
  );
}
