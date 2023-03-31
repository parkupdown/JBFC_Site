import { useRecoilValue } from "recoil";
import { WeatherInfo } from "../atoms";

function PollutionChart() {
  console.log(useRecoilValue(WeatherInfo));
  return <div>Pollution</div>;
}
export default PollutionChart;
