import { useEffect } from "react";
import { useRef } from "react";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";

import { httpClient } from "../../api/http";
import { getNickName } from "../../store/nickNameStore";
import { Content } from "./BoardCase";
import { useBoardInfinite } from "../../hooks/useBoardInfinite";
import { fetchMyBoard } from "../../api/board.api";

export default function BoardMine() {
  const ref = useRef(null);

  const { data, isLoading } = useBoardInfinite(
    ref,
    "myBoardData",
    fetchMyBoard
  );

  return (
    <Container>
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
`;
const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;
