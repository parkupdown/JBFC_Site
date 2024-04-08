import { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Content } from "./BoardContent";
import { useBoardInfinite } from "@/hooks/useBoardInfinite";
import { fetchAllBoard } from "@/api/board.api";

export default function Board() {
  const ref = useRef(null);
  // id가 아닌 nickname으로 불러오자

  //const { isLoading, data } = useQuery("boardData", getBoardData);
  const { data, isLoading } = useBoardInfinite(ref, "boardData", fetchAllBoard);

  return (
    <Container>
      <div className="navigation">
        <Link to={`/board/write`}>
          <span>게시글 작성</span>
        </Link>
        <Link to={`/board/mine`}>
          <span>내가 작성한 게시글</span>
        </Link>
      </div>

      <BoardContainer>
        {!isLoading &&
          data.pages &&
          data.pages.map(
            (page) =>
              page &&
              page.map((boardData) => (
                <Content
                  boardData={boardData}
                  key={boardData.id}
                  deleteMode={false}
                />
              ))
          )}
      </BoardContainer>
      <div ref={ref}></div>
    </Container>
  );
}
const Container = styled.div`
  width: 100vw;
  a {
    text-decoration: none;
    text-decoration-line: none;
    color: #516fd4;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 10px;
    font-size: 14px;
    border: 0.5px solid #eeeeee;
  }
  .navigation {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
`;
const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;
/**
 * 
 *    <BoardContainerWrrap>
        {!isLoading &&
          data.pages &&
          data.pages.map((page) =>
            page.map((boardData) => (
              <Content boardData={boardData} key={boardData.id} />
            ))
          )}
      </BoardContainerWrrap>
 */

/*
      `/board?page=${pageParam}`(전체)
      `/board/detail/${boardId}`(디테일)
      `/board/mine/${nickName}?page=${pageParam}`(내꺼)
      `/board/lastest(가장 최근)
      
   // 각각에 따라 다른 Fetch값을 Return 하는 Fetch 함수만 만들어도 간단해질듯

       /board?page
       /board?detailId
       /board?mine
       /board?lastest

      */
