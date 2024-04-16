import { httpClient } from "./http";

export const isVoted = async (schedule_id) => {
  const response = await httpClient.get(`/vote/${schedule_id}`);
  return response.data;
};

export const fetchGetPlayers = async (scheduleData) => {
  const schedule_id = scheduleData.map((item) => item.id);
  const response = await httpClient.get(`/player?schedule_id=${schedule_id}`);
  return response.data;
};

export const fetchGetVotes = async (scheduleData) => {
  const schedule_id = scheduleData.map((item) => item.id);
  const response = await httpClient.get(`/vote?schedule_id=${schedule_id}`);
  return response.data;
};
