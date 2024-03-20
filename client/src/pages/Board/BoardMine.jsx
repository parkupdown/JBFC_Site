import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useInfiniteQuery, useMutation } from "react-query";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { httpClient } from "../../api/http";
import { getNickName } from "../../store/nickNameStore";

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
  const nickName = getNickName();
  const ref = useRef(null);
  const navigator = useNavigate();
  const [removeMode, setRemoveMode] = useState(false);
  const [removeBoardIdArr, setRemoveBoardIdArr] = useState([]);

  const goToBoardDetail = (dataId) => navigator(`/board/detail/${dataId}`);
  const setCheckedItem = (checked, id) => {
    if (checked) {
      setRemoveBoardIdArr((current) => [...current, id]);
    } else if (!checked) {
      setRemoveBoardIdArr((current) => {
        const newData = current.filter((item) => item !== id);
        return newData;
      });
    }
  };

  const getMyBoardData = async ({ pageParam = 0 }) => {
    const getData = await httpClient.get(
      `/board/mine/${nickName}?page=${pageParam}`
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

  const removeMyBoardData = async () => {
    try {
      await httpClient.delete("/board/mine", {
        data: { removeBoardIdArr: removeBoardIdArr },
      });
      setRemoveMode((current) => !current);
    } catch (error) {
      alert("오류 발생");
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(() => removeMyBoardData(), {
    onSuccess: () => {
      queryClient.setQueryData("myBoardData", (prev) => {
        let prevBoardData = prev.pages;

        const newData = prevBoardData.map((arr) => {
          if (arr === undefined) {
            return [];
          }
          return arr.filter((data) => !removeBoardIdArr.includes(data.id));
        });
        return { pages: newData };
      });
      // myPage에서 삭제

      queryClient.setQueryData("boardData", (prev) => {
        let prevBoardData = prev.pages;
        let newData = prevBoardData.map((arr) => {
          if (arr === undefined) {
            return undefined;
          }
          return arr.filter((data) => !removeBoardIdArr.includes(data.id));
        });
        return { pages: newData };
      });
    },
  });
  // 캐싱된데이터는 유지하면서 수정으로 해당 정보를 수정함

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

  return (
    <Container>
      <div onClick={() => setRemoveMode((current) => !current)}>
        {removeMode ? <h3>삭제 취소</h3> : <h3>게시글 삭제</h3>}
      </div>
      <BoardContainerWrrap>
        {isLoading ? (
          <h2>로딩중</h2>
        ) : (
          data.pages.map((page) => {
            return page === undefined
              ? null
              : page.map((data, key) => (
                  <BoardContainer
                    onClick={removeMode ? null : () => goToBoardDetail(data.id)}
                    id={data.id}
                    key={key}
                  >
                    {removeMode ? (
                      <div>
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            setCheckedItem(e.target.checked, data.id)
                          }
                        />
                        <label>삭제</label>
                      </div>
                    ) : null}
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

        {removeMode ? (
          <button type="button" onClick={() => mutation.mutate()}>
            삭제
          </button>
        ) : null}
      </BoardContainerWrrap>
      <div ref={ref}></div>
    </Container>
  );
}
