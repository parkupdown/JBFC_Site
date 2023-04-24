import styled from "styled-components";
import { Constants } from "../constants";

const Container = styled.div`
  color: #333;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
`;

const InfoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const InfoItem = styled.li`
  margin: 0.6rem 0 1rem 0;
  font-weight: 500;
  background-color: aliceblue;
  padding: 5px;
  border-radius: 10px;
`;
const InfoTitleItem = styled.li`
  padding: 20px;
  background-color: #3b5998;
  border-radius: 30px;
  margin: 0.6rem 0 1rem 0;
  font-size: 20px;
  font-weight: 600;
  animation: pulse;
  animation-iteration-count: 5;
  animation-duration: 1s;
  animation-delay: 3s;
  color: white;
`;

const WeatherHeader = styled.h3`
  color: #3b5998;
  font-size: 24px;
  margin-top: 0;
  font-weight: bold;
`;
const SubHeader = styled.p`
  color: #3b5998;
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Icon = styled.i`
  margin-top: 20px;
  font-size: 72px;
  margin-bottom: 20px;
  animation: bounceInDown;
  animation-iteration-count: 1;
  animation-duration: 1s;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Pollution({ data }) {
  //data에는 미세먼지 데이터(배열)이 담겨있다.
  const pollutionInfo = data.data.response.body.items[7];
  // 2시 데이터를 가져옴
  const pm10 = parseInt(pollutionInfo.pm10Value);
  const pm25 = parseInt(pollutionInfo.pm25Value);
  const pm10Grade = pollutionInfo.pm10Grade;
  //미세먼지 등급
  const pm25Grade = pollutionInfo.pm25Grade;
  //초미세먼지 등급

  //미세먼지 등급에 따라 message와 incon과 color를 다르게 바인딩
  const checkPollutionCondition = () => {
    let message;
    let iconClassName;
    let color;
    if (pm10Grade === "4" || pm25Grade === "4") {
      message = Constants.POLLUTION.VERYBAD;
      iconClassName = Constants.POLLUTIONICON.VERYBAD;
      color = Constants.POLLUTIONCLOLOR.VERYBAD;
    } else if (pm10Grade === "3" || pm25Grade === "3") {
      message = Constants.POLLUTION.BAD;
      iconClassName = Constants.POLLUTIONICON.BAD;
      color = Constants.POLLUTIONCLOLOR.BAD;
    } else if (pm10Grade === "2" || pm25Grade === "2") {
      message = Constants.POLLUTION.GOOD;
      iconClassName = Constants.POLLUTIONICON.GOOD;
      color = Constants.POLLUTIONCLOLOR.GOOD;
    } else if (pm10Grade === "1" || pm25Grade === "1") {
      message = Constants.POLLUTION.VERYGOOD;
      iconClassName = Constants.POLLUTIONICON.VERYGOOD;
      color = Constants.POLLUTIONCLOLOR.VERYGOOD;
    }
    return [message, iconClassName, color];
  };

  const pollutionCondition = checkPollutionCondition();

  return (
    <Container>
      <WeatherContainer>
        <SubHeader>건국동 기준</SubHeader>
        <WeatherHeader>실시간 미세먼지</WeatherHeader>
      </WeatherContainer>
      <Icon
        style={{ color: `${pollutionCondition[2]}` }}
        className={pollutionCondition[1]}
      ></Icon>
      <InfoList>
        <InfoTitleItem>{pollutionCondition[0]}</InfoTitleItem>
        <InfoItem>미세먼지: {pm10} ㎍/㎥</InfoItem>
        <InfoItem>초미세먼지: {pm25} ㎍/㎥</InfoItem>
        <InfoItem style={{ fontSize: "12px" }}>
          데이터는 15분마다 자동갱신됩니다.
        </InfoItem>
      </InfoList>
    </Container>
  );
}

export { Pollution };

/*<li>초미세먼지: {makePollutionInfo(data)[0]}</li>
        <li>미세먼지: {makePollutionInfo(data)[1]}</li>
        <li>기준날짜: {makePollutionInfo(data)[2]}</li> */
