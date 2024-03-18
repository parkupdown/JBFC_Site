import styled from "styled-components";
import { formatNumber } from "../../utils/format";

export function ScheduleToday({ scheduleData }) {
  return (
    <ScheduleContainer>
      {scheduleData.length === 0 ? (
        <>
          <h3>오늘은 경기가 없습니다</h3>
          <span>경기일정 카테고리를 통해 경기 일정을 조절할 수 있어요.</span>
        </>
      ) : (
        <>
          <h3>오늘 경기</h3>
          <ScheduleAndImgBox>
            <div>
              <span>광주 {scheduleData[0].ground}</span>
              <span>시간: {scheduleData[0].time}</span>
              <span>자체/매칭: {scheduleData[0].type_of_match}</span>
              <span>참여인원: {scheduleData[0].num_of_player}명</span>
              <span>{formatNumber(scheduleData[0].price)}원/2시간</span>
            </div>
            <ImgBox>
              <img src={`/Ground/${scheduleData[0].ground}.png`} />
            </ImgBox>
          </ScheduleAndImgBox>
        </>
      )}
    </ScheduleContainer>
  );
}
const ScheduleContainer = styled.div`
  width: 100vw;
  padding: 20px;
  border-radius: 20px;
`;
const ScheduleAndImgBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
`;
const ImgBox = styled.div`
  width: 40vw;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 14px;
  }
`;
