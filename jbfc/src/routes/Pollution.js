import styled from "styled-components";
import { Constants } from "../constants";

function UnixToDate(Unix) {
  const time = new Date(Unix * 1000);
  const week = [`일`, `월`, `화`, `수`, `목`, `금`, `토`];
  const dayOfWeek = week[time.getDay()];
  return `${
    time.getMonth() + 1
  }월 ${time.getDate()}일 ${time.getHours()}시 ${dayOfWeek}요일`;
} //옮겨줘여함

function Pollution({ data }) {
  const makePollutionInfo = (data) => {
    let message;
    let iconClassName;

    const pollutionInfo = data.data.list;

    const pm10 = pollutionInfo[0].components.pm10;
    //미세먼지
    const pm25 = pollutionInfo[0].components.pm2_5;
    //초미세먼지
    const day = UnixToDate(pollutionInfo[0].dt);

    if (pm10 <= 30 || pm25 <= 15) {
      message = Constants.POLLUTION.VERYGOOD;
      iconClassName = Constants.POLLUTIONICON.VERYGOOD;
    } else if (pm10 <= 80 || pm25 <= 35) {
      message = Constants.POLLUTION.GOOD;
      iconClassName = Constants.POLLUTIONICON.GOOD;
    } else if (pm10 <= 150 || pm25 <= 75) {
      message = Constants.POLLUTION.BAD;
      iconClassName = Constants.POLLUTIONICON.BAD;
    } else {
      message = Constants.POLLUTION.VERYBAD;
      iconClassName = Constants.POLLUTIONICON.VERYBAD;
    }

    return [pm10, pm25, day, message, iconClassName];
  };

  const PollutionWrapper = styled.div`
    background-color: #f2f2f2;
    color: #333;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const PollutionHeader = styled.h3`
    color: #0288d1;
    font-size: 24px;
    margin-top: 0;
  `;

  const PollutionList = styled.ul`
    list-style: none;
    padding: 0;
  `;

  const PollutionListItem = styled.li`
    margin: 0.6rem 0;

    &:before {
      color: #03a9f4;
      display: inline-block;
      margin-right: 5px;
    }
  `;

  const Icon = styled.i`
    font-size: 72px;
    margin-bottom: 20px;
  `;

  return (
    <PollutionWrapper>
      <PollutionHeader>실시간 내 위치 미세먼지</PollutionHeader>
      <Icon className={makePollutionInfo(data)[4]}></Icon>
      <PollutionList>
        <PollutionListItem>{makePollutionInfo(data)[3]}</PollutionListItem>
        <PollutionListItem>
          미세먼지: {makePollutionInfo(data)[0]} pm
        </PollutionListItem>
        <PollutionListItem>
          초미세먼지: {makePollutionInfo(data)[1]} pm
        </PollutionListItem>
        <PollutionListItem>
          측정기준: {makePollutionInfo(data)[2]}
        </PollutionListItem>
      </PollutionList>
    </PollutionWrapper>
  );
}

export { Pollution, UnixToDate };

/*<li>초미세먼지: {makePollutionInfo(data)[0]}</li>
        <li>미세먼지: {makePollutionInfo(data)[1]}</li>
        <li>기준날짜: {makePollutionInfo(data)[2]}</li> */
