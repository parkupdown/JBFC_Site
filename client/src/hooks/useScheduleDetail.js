import { useEffect } from "react";
import { useState } from "react";
import { fetchScheduleDetailData } from "@/api/schedule.api";

export const useScheduleDetail = (month, day) => {
  const [scheduleDetail, setScheduleDetail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchScheduleDetailData(month, day);
      setScheduleDetail(response);
    };
    fetchData();
  }, [day, month]);

  return { scheduleDetail };
};
