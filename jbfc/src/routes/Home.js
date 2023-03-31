import LoginBarrier from "./LoginBarrier";
import { Pollution } from "./Pollution";

import Weather from "./Weather";

function Home() {
  const userId = localStorage.getItem(`userId`);

  return userId === null ? (
    <LoginBarrier />
  ) : (
    <div>
      Home입니다.
      <h1>반갑습니다.{userId}님!</h1>
      <hr />
      <Pollution />
      <Weather />
    </div>
  );
}
/*
 */
export default Home;
