import { httpClient } from "./http";
import { getNickName } from "../store/nickNameStore";
import { queryClient } from "../App";
/*
export const getLastestBoardData = async () => {
  const getData = await httpClient.get("/board/lastest");
  return getData.data;
};
*/

// 일단 location.state 가 변하면 fetching하도록 할건데

// 기본적으로 board에서 한번 불러서 사용할것

export const fetchBoard = async (paramsData) => {
  //paramsData에 대한 추적이 필요해
  // 지금의 Url에서 값을 꺼내기
  const response = await httpClient.get(`/board`, {
    params: paramsData,
  });
  return response.data;
};

export const fetchBoardLastest = async () => {
  const response = await httpClient.get(`/board/lastest`);
  return response.data;
};

export const fetchMyBoard = async ({ pageParam = 0 }) => {
  const nickName = getNickName();
  const response = await httpClient.get(
    `/board/mine/${nickName}?page=${pageParam}`
  );
  if (response.data === false) {
    return;
  }
  return response.data;
};

export const fetchAllBoard = async ({ pageParam = 0 }) => {
  const board = await httpClient.get(`/board?page=${pageParam}`);
  if (board.data === false) {
    return;
  }
  return board.data;
};

export const fetchDeleteBoard = async (deleteBoardIdArr) => {
  await httpClient.delete(`board/mine/${deleteBoardIdArr}`);
};

export const resetBoardCacheData = async () => {
  queryClient.invalidateQueries("myBoardData");
  queryClient.invalidateQueries("boardData");
  queryClient.invalidateQueries("lastestBoardData");
};
//query string을 사용한다면 한 페이지 안에서 데이터를 분기해서 페칭할때
// 그런데 각 query string에 따라 컴포넌트가 다르다면 이러한 방법을 안쓰는게 더 낫겠네
