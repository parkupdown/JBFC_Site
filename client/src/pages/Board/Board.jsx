import { useRef } from "react";
import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { httpClient } from "../../api/http";
import { Link } from "react-router-dom";
import { Content } from "./BoardCase";

export default function Board() {
  const navigator = useNavigate();
  const ref = useRef(null);
  // id가 아닌 nickname으로 불러오자

  const getBoardData = async ({ pageParam = 0 }) => {
    const board = await httpClient.get(`/board?page=${pageParam}`);
    if (board.data === false) {
      return;
    }
    return board.data;
  };

  //const { isLoading, data } = useQuery("boardData", getBoardData);

  let { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: "boardData",
    queryFn: getBoardData,
    getNextPageParam: (lastPage, allpages) => {
      const nextPage = allpages.length;

      if (lastPage === undefined) {
        return undefined; // 캐시된 데이터가 없을 때는 더 이상 요청하지 않음
      }
      return nextPage;
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        fetchNextPage();
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    if (!hasNextPage) {
      observer.disconnect();
    } // 만약 다음 페이지가 없다면 옵저버 제거
    return () => observer.disconnect();
  }, [hasNextPage]);

  !isLoading && console.log(data.pages);

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
                <Content boardData={boardData} key={boardData.id} />
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
    color: black;
    padding: 10px;
    background-color: #f8f8f8;
    border-radius: 20px;
    font-size: 14px;
    border: 0.5px solid white;
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
