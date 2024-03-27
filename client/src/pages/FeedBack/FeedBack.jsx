import { useState } from "react";
import { useQuery } from "react-query";

import { httpClient } from "../../api/http";
import FeedBackModal from "./FeedBackModal";
import { useEffect } from "react";

export default function FeedBack() {
  // 여기서 이번달 경기일정을 받아와서
  // 있는 경기에 해당해서 FeedBack
  // month를 나타낼수있는 state가 필요
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);

  const goNextMonth = () => {
    setMonth((current) => {
      const nextMonth = (current + 1) % 12;
      if (nextMonth === 0) {
        return 12;
      }
      return nextMonth;
    });
  };
  const goBeforeMonth = () => {
    setMonth((current) => {
      const beforeMonth = (current - 1) % 12;
      if (beforeMonth === 0) {
        return 12;
      }
      return beforeMonth;
    });
  };

  const getScheduleData = async () => {
    const getSchedule = await httpClient.get(`/schedule?month=${month}`);
    const scheduleData = getSchedule.data;
    return scheduleData;
  };

  const { isLoading, data } = useQuery(`${month}월`, getScheduleData);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const clickSchedule = (e) => {
    let getScheduleId;
    if (e.target.tagName === "DIV") {
      getScheduleId = parseInt(e.target.id);
    } else {
      getScheduleId = parseInt(e.target.parentElement.id);
    }
    setScheduleData(data[getScheduleId]);
    openModal();
  };
  // 여기서 캐싱해와야함 ?

  return (
    <>
      {isLoading ? (
        <h3>로딩중</h3>
      ) : (
        <div>
          {isOpenModal ? (
            <div>
              <FeedBackModal
                closeModal={closeModal}
                scheduleId={scheduleData.id}
                playerNum={scheduleData.num_of_player}
                isOpenModal={isOpenModal}
              ></FeedBackModal>
            </div>
          ) : null}
          <div>
            <button type="button" onClick={goBeforeMonth}>
              이전 달
            </button>
            <button type="button" onClick={goNextMonth}>
              다음 달
            </button>
          </div>
          <h2>{month}월 경기 목록</h2>
          {data.length === 0 ? (
            <h2>경기 데이터가 없습니다!</h2>
          ) : (
            data.map((item, index) => (
              <div
                style={{
                  backgroundColor: "tomato",
                  padding: "20px",
                  width: "70vw",
                }}
                key={item.id}
                onClick={clickSchedule}
                id={index}
              >
                <h4>
                  {item.month}월 {item.day}일 {item.time} 경기
                </h4>
                <h4>경기장: {item.ground}</h4>

                <p>{item.type_of_match}전</p>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}
/**
 *      {isOpenModal ? (
            <div>
              <FormModal closeModal={closeModal} ></FormModal>
            </div>
          ) : null}
 */
