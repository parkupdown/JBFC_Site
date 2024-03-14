import { httpClient } from "./http";

export const getLastestBoardData = async () => {
  const getData = await httpClient.get("http://localhost:3060/board/lastest");
  return getData.data;
};
