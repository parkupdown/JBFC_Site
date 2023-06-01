import { useState } from "react";
import Inputview from "./InputView";

export default function Controller() {
  const [players, setPlayers] = useState(``);
  const [teams, setTeams] = useState(``);
  return (
    <div>
      <Inputview setPlayers={setPlayers} setTeams={setTeams} />
    </div>
  );
}
