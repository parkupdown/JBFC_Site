import { useLocation } from "react-router-dom";
import { fetchBoard } from "../api/board.api";
import { getNickName } from "@/store/nickNameStore";
import { useQuery } from "react-query";

export const useBoards = (keyName) => {
  const nickName = getNickName();
  //여기서 Prams를 정해야함
  // 얘는 지금 현재 Url에서 querystring정보를 가져와서 있다면 넣어주는 역할만 하면됨
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const paramsData = {
    page: params.get("page") ? 0 : undefined,
    mine: params.get("mine") ? nickName : undefined,
    detail: params.get("detail") ? params.get("detail") : undefined,
  };
  const { isLoading: boardLoading, data: boardData } = useQuery(keyName, () =>
    fetchBoard(paramsData)
  );

  return { boardLoading, boardData };
};
