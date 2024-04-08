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
        <div className="description">
          <span className="title">제목: {boardData.title}</span>
          <span className="content">
            {boardData.content && formatContent(boardData.content)}
          </span>
          <span className="nickname">by {boardData.nickname}</span>
        </div>
      </ContentBox>
    </div>
  );
}

const ContentBox = styled.div`
  background-color: white;
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
  padding: 24px;
  .imgBox {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      border-radius: 20px;
    }
  }

  .description {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fbfcff;
    padding: 10px;
    border-radius: 10px;

    .title {
      font-size: 20px;
      margin-bottom: 5px;
      background-color: #ffffff;
    }

    .content {
      font-size: 15px;
      margin-bottom: 5px;
      background-color: #ffffff;
      color: #666;
    }

    .nickname {
      font-size: 12px;
      color: #666;
      background-color: #ffffff;
    }
  }
`;
