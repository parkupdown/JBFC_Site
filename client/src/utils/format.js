export const formatNumber = (number) => {
  return Number(number).toLocaleString();
};

export const formatContent = (content) => {
  if (content.length > 10) {
    return content.substr(0, 10) + "...";
  }
  return content;
};

export const formatOrderByScore = (playerData) => {
  playerData = playerData.sort((a, b) => b.score - a.score);
  return playerData;
};

export const formatMvpPlayer = (playerData, voteCount) => {
  console.log(playerData);
  playerData = playerData.sort((a, b) => b.score - a.score);
  let maxScore = playerData[0].score;
  let mvpPlayer = playerData
    .filter((item) => item.score === maxScore)
    .map((item) => item.player + " ")
    .join(``);
  maxScore = Math.ceil(maxScore / voteCount);
  if (isNaN(maxScore)) {
    maxScore = 0;
    mvpPlayer = "투표인원:0";
  }

  return { maxScore, mvpPlayer };
};

export const formatOrderby = (playerData) => {
  playerData.sort((a, b) => b.score - a.score);
};

export const formatAverageScore = (playerData) => {
  const averageScore = Math.ceil(
    playerData.map((item) => item.score).reduce((acc, cur) => acc + cur) /
      playerData.length
  );
  return averageScore;
};
