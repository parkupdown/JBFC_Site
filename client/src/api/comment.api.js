import { httpClient } from "./http";

export const fetchGetComment = async (boardId) => {
  const response = await httpClient.get(`/comment/${boardId}`);

  return response.data;
};
export const fetchPostComment = async (commentData) => {
  const response = await httpClient.post(`/comment`, commentData);
  return response.data;
};

export const fetchDeleteComment = async (commentId) => {
  await httpClient.delete(`/comment/${commentId}`);
};
