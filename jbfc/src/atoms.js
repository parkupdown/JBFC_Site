import { atom } from "recoil";

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

export { UserId, PollutionInfo, WeatherInfo };
