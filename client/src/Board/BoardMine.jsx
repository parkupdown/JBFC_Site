import axios from "axios";

import { CheckAuthorization } from "../CheckAuthorization/CheckAuthorization";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
`;
const BoardContainerWrrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const BoardContainer = styled.div`
  width: 25vw;
  height: 25vh;
  background-color: aliceblue;
  padding: 20px;
  border: 1px dotted black;
  border-radius: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  span {
    font-size: 16px;
  }
`;

export default function BoardMine() {
  const { userId } = useLocation().state;
  const ref = useRef(null);
  const navigator = useNavigate();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        await CheckAuthorization();
      } catch (error) {
        alert(error);
        navigator("/login");
      }
    };
    checkUserSession();
  }, []);

  const getMyBoardData = async ({ pageParam = 0 }) => {
    const getData = await axios.get(
      `http://localhost:3060/board/mine/${userId}?page=${pageParam}`
    );
    if (getData.data === false) {
      return;
    }

    return getData.data;
  };

  let { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: "myBoardData",
    queryFn: getMyBoardData,
    getNextPageParam: (lastPage, allpages) => {
      //언제 undefined하느냐가 관건
      const nextPage = allpages.length;
      if (lastPage === undefined) {
        return undefined; // 캐시된 데이터가 없을 때는 더 이상 요청하지 않음
      }
      //lastPage가 Undefined면 더이상 다음 페이지를 불러오지 않는다.
      return nextPage;
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver((e) => {
      console.log(e);
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

  return (
    <Container>
      <h1>내가 작성한 게시글</h1>
      <h3 onClick={() => navigator(-1)}>뒤로가기</h3>
      <BoardContainerWrrap>
        {isLoading ? (
          <h2>로딩중</h2>
        ) : (
          data.pages.map((page) => {
            return page === undefined
              ? null
              : page.map((data, key) => (
                  <BoardContainer
                    onClick={() => navigator(`/board/detail/${data.id}`)}
                    id={data.id}
                    key={key}
                  >
                    {data.thumbnail !== null ? (
                      <img
                        src={`http://localhost:3060/image/${data.thumbnail}`}
                      />
                    ) : (
                      <img src="http://localhost:3060/image/thumbnail.jpeg" />
                    )}
                    <span>{data.title}</span>
                  </BoardContainer>
                ));
          })
        )}
      </BoardContainerWrrap>
      <div ref={ref}></div>
    </Container>
  );
}
