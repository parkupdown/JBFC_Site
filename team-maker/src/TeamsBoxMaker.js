import { useEffect, useState } from "react";

export default function TeamsBoxMaker({ teams }) {
  const teamsArr = Array.from({ length: teams }, (v, i) => i + 1);
  const teamPlayerSet = Array.from({ length: teams }, () => 0);
  // team에 따라 teamPlayerArr을 조정

  const [teamPlayer, setTeamPlayer] = useState([]);
  useEffect(() => {
    setTeamPlayer(teamPlayerSet);
  }, [teams]);
  // team아 바뀔 때만 초기 arr세팅

  const teamPlayerUp = (index) => {
    setTeamPlayer((current) => {
      const newCurrent = current.map((item, i) =>
        i === index ? item + 1 : item
      );

      return newCurrent;
    });
  };
  // teamplayer를 동적으로 추가할 수 있다.
  const teamPlayerDown = (index) => {
    setTeamPlayer((current) => {
      const newCurrent = current.map((item, i) =>
        item === 0 ? 0 : i === index ? item - 1 : item
      );

      return newCurrent;
    });
  };
  // teamplayer를 동적으로 제거할 수 있다.

  const makePlayerBox = (player) => {
    const arr = Array.from({ length: player });
    return arr.map((item, index) => (
      <input placeholder={`player${index + 1}`} />
    ));
  };
  // 위 함수로 playerBox를 만든다
  //변수명 수정 필요

  return (
    <div>
      {teamsArr.map((team, index) => (
        <div key={index}>
          <h3>{team}팀</h3>
          {teamPlayer.map((player, playerIndex) =>
            index === playerIndex ? makePlayerBox(player) : null
          )}
          <button onClick={() => teamPlayerUp(index)}>인원 추가</button>
          <button onClick={() => teamPlayerDown(index)}>인원 삭제</button>
        </div>
      ))}
    </div>
  );
}
