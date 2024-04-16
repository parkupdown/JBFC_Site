import { useQuery } from "react-query";
import { fetchScheduleOfMonthData } from "@/api/schedule.api";

export const useSchedule = (month) => {
  const { isLoading, data } = useQuery(`${month}월`, () =>
    fetchScheduleOfMonthData(month)
  );

  return { isLoading, data };
};
