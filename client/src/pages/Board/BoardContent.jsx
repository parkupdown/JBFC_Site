import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { formatContent } from "@/utils/format";

export function Content({ boardData }) {
  const navigator = useNavigate();
  const goToDetailBoard = () => navigator(`/board/detail/${boardData.id}`);

  return (
    <div onClick={goToDetailBoard}>
      <ContentBox>
        <div className="imgBox">
          {boardData.thumbnail === null ? (
            <img src="http://localhost:3060/image/thumbnail.jpeg" />
          ) : (
            <img src={`http://localhost:3060/image/${boardData.thumbnail}`} />
          )}
        </div>
        <div className="contents">
          <span className="title">{boardData.title}</span>
          <span className="content">
            {boardData.content && formatContent(boardData.content)}
          </span>
          <span className="by">by {boardData.nickname}</span>
        </div>
      </ContentBox>
    </div>
  );
}

const ContentBox = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.box};
  @media (max-width: 860px) {
    width: 70vw;
  }
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-10px);
  }

  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 24px;
  margin-top: 20px;
  .imgBox {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      border-radius: 20px;
    }
  }

  .contents {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.backgroundColor.box};
    padding: 40px;
    border-radius: 15px;
    .title {
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      margin: 10px 0;
      font-size: 12px;
    }
    .by {
      font-size: 9px;
      background-color: ${({ theme }) => theme.backgroundColor.button};
      color: ${({ theme }) => theme.color.positive};
      width: max-content;
      padding: 0 20px;
      border-radius: 5px;
      opacity: 0.7;
    }
  }
`;
