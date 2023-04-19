export const Constants = {
  APIURL: {
    WEATHER: (lat, lnd) =>
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lnd}&appid=2834387742b25d5393a21e88fee8246a`,
    POLLUTION: `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=ZHRtNHeVdq3RstoihtljiyUq1bREx70chuG19hWrdBrZr8cs%2Bzcc1KtztI15NVWUwNWX7qTJQFG8gcgdTEILUA%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EA%B4%91%EC%A3%BC&ver=1.1`,
  },
  WEATHER: {
    THUNDERSTORM: "많은 비",
    DRIZZLE: "이슬비",
    RAIN: "보통비",
    SNOW: "눈이와",
    ATMOSPHERE: "흐린날",
    CLEAR: "맑은날",
    CLOUDS: "먹구름",
  },
  WEATHERICON: {
    THUNDERSTORM: "fa-solid fa-cloud-showers-heavy ",
    DRIZZLE: "fa-solid fa-cloud-rain ",
    RAIN: "fa-solid fa-cloud-showers-heavy",
    SNOW: "fa-regular fa-snowflake f",
    ATMOSPHERE: "fa-solid fa-smog ",
    CLEAR: "fa-regular fa-sun ",
    CLOUDS: "fa-solid fa-cloud ",
  },
  WEATHERURL: {
    THUNDERSTORM: " https://openweathermap.org/img/wn/11d@2x.png",
    DRIZZLE: " https://openweathermap.org/img/wn/10d@2x.png",
    RAIN: " https://openweathermap.org/img/wn/09d@2x.png",
    SNOW: " https://openweathermap.org/img/wn/13d@2x.png",
    ATMOSPHERE: " https://openweathermap.org/img/wn/50d@2x.png",
    CLEAR: " https://openweathermap.org/img/wn/01d@2x.png",
    CLOUDS: " https://openweathermap.org/img/wn/03d@2x.png",
  },

  POLLUTION: {
    VERYGOOD: "매우좋음",
    GOOD: "좋음",
    BAD: "나쁨",
    VERYBAD: "매우나쁨",
  },
  POLLUTIONICON: {
    VERYGOOD: "fa-regular fa-face-grin-hearts ",
    GOOD: "fa-regular fa-face-grin-beam ",
    BAD: "fa-regular fa-face-meh-blank ",
    VERYBAD: "fa-regular fa-face-angry ",
  },
  POLLUTIONCLOLOR: {
    VERYGOOD: "#3b5998",
    GOOD: "#3b5998",
    BAD: "#c94742",
    VERYBAD: "#1b1b1b",
  },
};
