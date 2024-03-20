import styled from "styled-components";
import { formatNumber } from "../../utils/format";
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
            <h4>오늘은 경기가 없습니다</h4>
            <span>오늘 풋살 안한다고?</span>
            <button onClick={() => navigator(`/schedule`)}>
              오늘 경기 등록하러가기
            </button>
          </div>
        </>
      ) : (
        <>
          <h4>오늘 경기</h4>
          <div className="container">
            <div className="imgBox">
              <img src={`/Ground/${scheduleData[0].ground}.png`} />
            </div>
            <h5>매치 정보</h5>
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
                  원/2시간{" "}
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

  .noschedule {
    display: flex;
    flex-direction: column;
    align-items: center;
    h4 {
      margin-left: 0;
    }
    span {
      font-size: 14px;
    }

    button {
      padding: 7px;
      margin-top: 5px;
      border-radius: 4px;
      border: 1px solid black;
    }
  }

  .container {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    .mention {
      width: 100vw;

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
      height: 16vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: white;
      * {
        background-color: white;
      }
      span {
        font-weight: 300;
      }
    }
    .mainInfo {
      span {
        font-weight: 600;
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
`;
