import { httpClient } from "../api/http";

export const checkDuplication = async (input, type) => {
  const { data } = await httpClient.get(`/join?input=${input}&type=${type}`);
  if (data) {
    throw new Error(`${type}이 중복됩니다.`);
  }
};
