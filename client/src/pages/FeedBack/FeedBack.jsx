import { useState } from "react";
import { useQuery } from "react-query";
import { httpClient } from "@/api/http";
import FeedBackModal from "./FeedBackModal";
import styled from "styled-components";

import { fetchGetPlayers } from "@/api/vote.api";
import { fetchGetVotes } from "@/api/vote.api";
import { formatMvpPlayer } from "../../utils/format";
import { useSchedule } from "@/hooks/useSchedule";

export default function FeedBack() {
  // 여기서 이번달 경기일정을 받아와서
  // 있는 경기에 해당해서 FeedBack
  // month를 나타낼수있는 state가 필요
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);

  // 여기서 이걸 호출하지 않잖아.
  // 호출안해버리니까 위 This monTh ScheduleDAta는 없는거지
  const { isLoading: thisMonthScheduleLoading, data: thisMonthScheduleData } =
    useSchedule(month);

  // 캐싱이 안되어있다면?

  // 만약 캐싱이 안되어있다면 어떡할텐가.
  // 여기서 캐싱을 해야겠지

  const { isLoading: playersLoading, data: playersData } = useQuery(
    `${month}players`,
    () => fetchGetPlayers(thisMonthScheduleData),
    {
      enabled: !thisMonthScheduleLoading,
    } // ID를 추출하여 전달
  );

  const { isLoading: votesLoading, data: votesData } = useQuery(
    `${month}votes`,
    () => fetchGetVotes(thisMonthScheduleData),
    {
      enabled: !thisMonthScheduleLoading,
    } // ID를 추출하여 전달
  );
  // enabled를 통해 언제 해결할지를 생각하자

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
    setScheduleData(thisMonthScheduleData[getScheduleId]);
    openModal();
  };

  return (
    <>
      {thisMonthScheduleLoading || votesLoading || playersLoading ? (
        <h4>로딩중</h4>
      ) : (
        <Container>
          {isOpenModal ? (
            <div>
              <FeedBackModal
                closeModal={closeModal}
                scheduleId={scheduleData.id}
                playerNum={scheduleData.num_of_player}
                isOpenModal={isOpenModal}
                month={month}
              ></FeedBackModal>
            </div>
          ) : null}
          <div className="headerBox">
            <span className="header">{month}월 경기 목록</span>
          </div>
          <div className="navBox">
            <span onClick={goBeforeMonth}>이전 달</span>
            <span onClick={goNextMonth}>다음 달</span>
          </div>

          {thisMonthScheduleData.length === 0 ? (
            <h2>경기 데이터가 없습니다!</h2>
          ) : (
            thisMonthScheduleData.map((item, index) => (
              <div
                className="contentsBox"
                key={item.id}
                onClick={clickSchedule}
                id={index}
              >
                <span className="date">
                  {item.month}월 {item.day}일 {item.time} 경기
                </span>
                <span className="ground">경기장: {item.ground}</span>
                <span className="type">{item.type_of_match}전</span>
                {playersData[index].length === 0 && (
                  <span className="nonVotingFormat">플레이어 등록</span>
                )}
                {votesData[index].length === 0 && (
                  <span className="noVote">투표 안함</span>
                )}
                {playersData[index].length !== 0 && (
                  <span className="mvp">
                    {`mvp ${
                      formatMvpPlayer(
                        playersData[index],
                        votesData[index].length
                      ).mvpPlayer
                    }
                    `}
                  </span>
                )}
                {playersData[index].length !== 0 && (
                  <span className="mvp">
                    최고점수
                    {
                      formatMvpPlayer(
                        playersData[index],
                        votesData[index].length
                      ).maxScore
                    }
                  </span>
                )}
              </div>
            ))
          )}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundColor.box};
  padding: 30px 0;
  .navBox {
    text-align: center;
    margin: 20px 0;

    span {
      background-color: ${({ theme }) => theme.backgroundColor.main};
      border: ${({ theme }) => theme.border.main};
      padding: 4px 12px;
      border-radius: 10px;
      font-size: 16px;
      margin: 0 8px;
      color: ${({ theme }) => theme.color.text};
      @media (max-width: 800px) {
        font-size: 14px;
      }
    }
  }
  .headerBox {
    text-align: center;
    color: ${({ theme }) => theme.color.positive};
    font-size: 22px;
    @media (max-width: 800px) {
      font-size: 20px;
    }
  }

  .contentsBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    border: ${({ theme }) => theme.border.main};
    background-color: ${({ theme }) => theme.backgroundColor.main};
    font-size: 13px;
    @media (max-width: 800px) {
      font-size: 10px;
    }

    .date {
      font-weight: 600;
      font-size: 22px;
      @media (max-width: 800px) {
        font-size: 20px;
      }
    }
    .ground {
      font-weight: 250;
      opacity: 0.7;
    }
    .type {
      font-weight: 250;
      opacity: 0.7;
    }
    .mvp {
      padding: 5px 10px;
      background-color: ${({ theme }) => theme.backgroundColor.box};
      border-radius: 10px;
      color: ${({ theme }) => theme.color.positive};
    }
    .nonVotingFormat {
      padding: 5px 10px;
      background-color: ${({ theme }) => theme.backgroundColor.box};
      border-radius: 10px;
      color: ${({ theme }) => theme.color.negativeClicked};
    }
    .noVote {
      padding: 5px 10px;
      background-color: ${({ theme }) => theme.backgroundColor.box};
      border-radius: 10px;
      color: ${({ theme }) => theme.color.negativeClicked};
    }
  }
`;
