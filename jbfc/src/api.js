const api = {
  BASE_URL: `https://jjackbalance.info`,
  WEATHER: (lat, lnd) =>
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lnd}&appid=2834387742b25d5393a21e88fee8246a`,
  POLLUTION: `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=ZHRtNHeVdq3RstoihtljiyUq1bREx70chuG19hWrdBrZr8cs%2Bzcc1KtztI15NVWUwNWX7qTJQFG8gcgdTEILUA%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EA%B4%91%EC%A3%BC&ver=1.1`,
};

export default api;
