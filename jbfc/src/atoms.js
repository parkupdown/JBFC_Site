import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const UserId = atom({
  key: "USERID",
  default: ``,
});
const PollutionInfo = atom({
  key: "POLLUTION",
  default: ``,
});
const WeatherInfo = atom({
  key: "WEATHER",
  default: ``,
});
const WeatherPollution = atom({
  key: "WEATHERPOLLUTION",
  default: ``,
  effects_UNSTABLE: [persistAtom],
});

export { UserId, PollutionInfo, WeatherInfo, WeatherPollution };
