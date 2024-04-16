import styled from "styled-components";
import { formatNumber } from "@/utils/format";
import { GiPunch } from "react-icons/gi";
import { MdPersonAddAlt } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";
import { TbBuildingStadium } from "react-icons/tb";
import { IoMdTime } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export function ScheduleToday({ scheduleData }) {
  const navigator = useNavigate();
  return (
    <ScheduleContainer>
      {scheduleData.length === 0 ? (
        <>
          <div className="noschedule">
            <button onClick={() => navigator(`/schedule`)}>
              오늘 경기 등록하러가기
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="title">
            <span>오늘 경기</span>
          </div>
          <div className="container">
            <div className="imgBox">
              <img src={`/Ground/${scheduleData[0].ground}.png`} />
            </div>
            <span className="type">매치 정보</span>
            <div className="contentBox">
              <div className="mainInfo">
                <span>
                  <TbBuildingStadium /> {scheduleData[0].ground}
                </span>
                <span>
                  <IoMdTime /> {scheduleData[0].time}
                </span>
              </div>
              <div className="subInfo">
                <span>
                  <GiPunch /> {scheduleData[0].type_of_match}
                </span>
                <span>
                  <MdPersonAddAlt /> {scheduleData[0].num_of_player}명
                </span>
                <span>
                  <IoPricetagOutline /> {formatNumber(scheduleData[0].price)}
                  원/2시간
                </span>
              </div>
            </div>
            <div className="mention">
              <span>부상을 조심합시다</span>
            </div>
          </div>
        </>
      )}
    </ScheduleContainer>
  );
}
const ScheduleContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  h4 {
    margin-left: 50px;
  }

  h5 {
    color: ${({ theme }) => theme.color.positive};
  }

  .noschedule {
    display: flex;
    flex-direction: column;
    align-items: center;
    h4 {
      margin-left: 0;
    }

    button {
      padding: 7px;
      margin-top: 5px;
      border-radius: 10px;
      border: ${({ theme }) => theme.border.main};
      color: ${({ theme }) => theme.color.positive};
      background-color: ${({ theme }) => theme.backgroundColor.box};
    }
  }

  .container {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    .type {
      margin: 10px;
      background-color: ${({ theme }) => theme.backgroundColor.box};
      padding: 10px;
      color: ${({ theme }) => theme.color.positive};
      border: ${({ theme }) => theme.border.main};
      border-radius: 6px;
    }
    .mention {
      width: 100vw;
      margin-top: 20px;
      text-align: center;
      span {
        text-align: center;
        font-weight: 400;
        opacity: 0.4;
      }
    }
  }
  .contentBox {
    width: 100vw;
    font-size: 14px;
    span {
      margin: 5px 0;
    }
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    div {
      width: 100vw;
      height: 20vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: ${({ theme }) => theme.backgroundColor.box};

      span {
        font-weight: 300;
      }
    }
    .mainInfo {
      span {
        font-weight: 600;
        background-color: ${({ theme }) => theme.backgroundColor.main};
        padding: 6px;
        border-radius: 3px;
        border: ${({ theme }) => theme.border.main};
      }
    }
    .subInfo {
      span {
        background-color: ${({ theme }) => theme.backgroundColor.main};
        padding: 6px;
        border-radius: 3px;
        border: ${({ theme }) => theme.border.main};
      }
    }
  }
  .imgBox {
    width: 70%;
    height: 300px;
    @media (max-width: 850px) {
      width: 100%;
      height: 150px;
    }
    text-align: center;
    img {
      width: auto;
      height: 100%;
      object-fit: contain;
      border-radius: 14px;
    }
  }

  .title {
    text-align: center;
    margin-bottom: 20px;
    span {
      background-color: ${({ theme }) => theme.backgroundColor.box};
      padding: 10px;
      color: ${({ theme }) => theme.color.positive};
      border: ${({ theme }) => theme.border.main};
      border-radius: 6px;
    }
  }
`;
