export default function Inputview({ setPlayers, setTeams }) {
  // class로 묶어서 바로 input이 생기면 좋을듯
  const onChangePeople = (event) => {
    event.preventDefault();
    setPlayers(event.currentTarget.value);
  };
  const onChangeTeam = (event) => {
    event.preventDefault();
    setTeams(event.currentTarget.value);
  };

  return (
    <div>
      <form>
        <input
          placeholder="총 몇명인가요?"
          onChange={onChangePeople}
          type="number"
        />
        <input
          placeholder="몇 팀으로 나눌 건가요?"
          onChange={onChangeTeam}
          type="number"
        ></input>
      </form>
    </div>
  );
}
