import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Content } from "../Board/BoardCase";

export function BoardLastest({ boardData }) {
  return (
    <div>
      {boardData === undefined ? (
        <h3>최근게시글이존재하지 않습니다</h3>
      ) : (
        <>
          <Content boardData={boardData} />
        </>
      )}
    </div>
  );
}

/*
const BoardContainer = styled.div`
  height: 30vh;

  // 반응형으로 몇이상이면 25로
  padding: 20px;
  border-radius: 20px;
  .contents {
    display: flex;
    justify-content: space-around;
  }
  img {
    width: 100%;
      width: 25vw;
  @media (max-width: 768px) {
    width: 100vw;
  }
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
`;
const ImgBox = styled.div`
  width: 40vw;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 14px;
  }
`; */
