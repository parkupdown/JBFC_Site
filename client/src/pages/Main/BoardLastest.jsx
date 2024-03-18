import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function BoardLastest({ boardData }) {
  const navigate = useNavigate();
  const nickName = localStorage.getItem("nickname");
  return (
    <BoardContainer>
      {boardData === undefined ? (
        <h3>최근게시글이존재하지 않습니다</h3>
      ) : (
        <div onClick={() => navigate(`/board/detail/${boardData.id}`)}>
          <h3>최근 게시글</h3>
          <div className="contents">
            <div>
              {boardData.thumbnail === null ? (
                <ImgBox>
                  <img src="http://localhost:3060/image/thumbnail.jpeg" />
                </ImgBox>
              ) : (
                <ImgBox>
                  <img
                    src={`http://localhost:3060/image/${boardData.thumbnail}`}
                  />
                </ImgBox>
              )}
            </div>
            <div>
              <span>Title: {boardData.title}</span>
              <span>{boardData.content.substr(0, 10)}</span>
              <span>{nickName}</span>
            </div>
          </div>
        </div>
      )}
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
  width: 100vw;
  padding: 20px;
  border-radius: 20px;
  .contents {
    display: flex;
    justify-content: space-around;
  }
  img {
    width: 100%;
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
`;
