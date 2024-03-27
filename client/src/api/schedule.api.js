import { useQueryClient } from "react-query";
import { httpClient } from "./http";
import { getDate } from "../utils/getDate";

export const getTodayScheduleData = async () => {
  const date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  day = parseInt(day);
  const getData = await httpClient.get(
    `/schedule/today?month=${month}&day=${day}`
  );
  return getData.data;
};

export const fetchScheduleOfMonthData = async (month) => {
  const response = await httpClient.get(`/schedule?month=${month}`);
  return response.data;
};

export const fetchScheduleDetailData = async (month, day) => {
  const response = await httpClient.get(
    `/schedule/detail?month=${month}&day=${day}`
  );
  return response.data;
};

export const postScheduleData = async (scheduleData) => {
  await httpClient.post(`/schedule`, scheduleData);
};

export const deleteScheduleData = async (month, day) => {
  await httpClient.delete(`/schedule?month=${month}&day=${day}`);
};

export const updateScheduleData = async (scheduleData) => {
  await httpClient.put(`/schedule`, scheduleData);
};
