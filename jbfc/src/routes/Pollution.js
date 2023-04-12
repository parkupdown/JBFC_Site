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
  console.log(data);

  const pollutionInfo = data.data.response.body.items[7];

  const pm10 = parseInt(pollutionInfo.pm10Value);
  //미세먼지
  const pm25 = parseInt(pollutionInfo.pm25Value);
  //초미세먼지
  const pm10Grade = pollutionInfo.pm10Grade;
  //미세먼지 등급
  const pm25Grade = pollutionInfo.pm25Grade;
  //초미세먼지 등급

  const checkPollutionCondition = () => {
    let message;
    let iconClassName;

    if (pm10Grade === "4" || pm25Grade === "4") {
      message = Constants.POLLUTION.VERYBAD;
      iconClassName = Constants.POLLUTIONICON.VERYBAD;
    } else if (pm10Grade === "3" || pm25Grade === "3") {
      message = Constants.POLLUTION.BAD;
      iconClassName = Constants.POLLUTIONICON.BAD;
    } else if (pm10Grade === "2" || pm25Grade === "2") {
      message = Constants.POLLUTION.GOOD;
      iconClassName = Constants.POLLUTIONICON.GOOD;
    } else if (pm10Grade === "1" || pm25Grade === "1") {
      message = Constants.POLLUTION.VERYGOOD;
      iconClassName = Constants.POLLUTIONICON.VERYGOOD;
    }
    return [message, iconClassName];
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
      <PollutionHeader>실시간 광주 북구 미세먼지</PollutionHeader>
      <Icon className={checkPollutionCondition()[1]}></Icon>
      <PollutionList>
        <PollutionListItem>{checkPollutionCondition()[0]}</PollutionListItem>
        <PollutionListItem>미세먼지: {pm10} ㎍/㎥</PollutionListItem>
        <PollutionListItem>초미세먼지: {pm25} ㎍/㎥</PollutionListItem>
      </PollutionList>
    </PollutionWrapper>
  );
}

export { Pollution, UnixToDate };

/*<li>초미세먼지: {makePollutionInfo(data)[0]}</li>
        <li>미세먼지: {makePollutionInfo(data)[1]}</li>
        <li>기준날짜: {makePollutionInfo(data)[2]}</li> */
