export default function PlayerBoxMaker({ players, teams }) {
  const playersArr = Array.from({ length: players }, (v, index) => index + 1);

  return (
    <div>
      {players !== `` ? <h3>Random팀</h3> : null}
      <form>
        {playersArr.map((player, index) => (
          <input placeholder={player} key={index} />
        ))}
      </form>
    </div>
  );
}
