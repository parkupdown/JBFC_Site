import { useRecoilValue } from "recoil";
import { WeatherInfo } from "../atoms";

function WeatherChart() {
  console.log(useRecoilValue(WeatherInfo));

  return <div>weather</div>;
}

export default WeatherChart;
