import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Content } from "../Board/BoardContent";
import { GoIssueClosed } from "react-icons/go";

export function BoardLastest({ boardData }) {
  return (
    <Container>
      {boardData === undefined ? (
        <h3>최근게시글이존재하지 않습니다</h3>
      ) : (
        <>
          <div className="spanBox">
            <span className="board">최근게시글</span>
          </div>

          <Content boardData={boardData} />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 30px;
  .spanBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    text-align: center;

    svg {
      font-size: 22px;
      @media (max-width: 800px) {
        font-size: 18px;
      }
    }
  }
  .board {
    font-size: 13px;
    color: ${({ theme }) => theme.color.positive};
    background-color: ${({ theme }) => theme.backgroundColor.main};
    padding: 3px 6px;
    border: ${({ theme }) => theme.border.main};
    border-radius: 5px;
    margin-top: 5px;
  }
`;
