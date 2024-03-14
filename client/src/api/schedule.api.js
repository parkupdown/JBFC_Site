import { httpClient } from "./http";

export const getTodayScheduleData = async () => {
  const date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  day = parseInt(day);
  const getData = await httpClient.get(
    `http://localhost:3060/schedule/today?month=${month}&day=${day}`
  );
  return getData.data;
};
