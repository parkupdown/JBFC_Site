import { useState } from "react";
import Inputview from "./InputView";
import PlayerBoxMaker from "./PlayerBoxMaker";

export default function Controller() {
  const [players, setPlayers] = useState(``);
  const [teams, setTeams] = useState(``);
  console.log(players, teams);
  return (
    <div>
      <Inputview
        setPlayers={setPlayers}
        players={players}
        setTeams={setTeams}
        teams={teams}
      />
      <PlayerBoxMaker players={players} teams={teams} />
    </div>
  );
}
