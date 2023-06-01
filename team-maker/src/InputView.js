export default function Inputview({ setPlayers, players, setTeams, teams }) {
  // class로 묶어서 바로 input이 생기면 좋을듯
  const onChangePlayer = (event) => {
    event.preventDefault();
    const playerNum = event.currentTarget.value;
    setPlayers(playerNum);
    if (playerNum > 40) {
      setPlayers(40);
    }
    if (playerNum < 0) {
      setPlayers(0);
    }
  };
  const onChangeTeam = (event) => {
    event.preventDefault();
    const teamNum = event.currentTarget.value;
    setTeams(teamNum);
    if (teamNum > 10) {
      setTeams(10);
    }
    if (teamNum < 0) {
      setTeams(0);
    }
  };

  return (
    <div>
      <form>
        <input
          placeholder="총 몇명인가요?"
          onChange={onChangePlayer}
          type="number"
          value={players}
        />
        <input
          placeholder="몇 팀으로 나눌 건가요?"
          onChange={onChangeTeam}
          type="number"
          value={teams}
        ></input>
      </form>
    </div>
  );
}
