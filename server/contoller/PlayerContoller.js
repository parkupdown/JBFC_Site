const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const { isAuthorization } = require("./CheckAuthorization");

const insertPlayerData = (req, res) => {
  if (!isAuthorization(req, res)) {
    return;
  }
  let { playerNames, schedule_id } = req.body;
  // playerName만큼 query날리면됨

  playerNames = Object.values(playerNames);
  playerNames.forEach((player) => {
    let sql = "INSERT INTO player (schedule_id, player, score) VALUE (?,?,?) ;";
    let value = [schedule_id, player, 0];
    conn.query(sql, value, function (err, result) {
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).end();
        return;
      }
    });
  });
  res.status(StatusCodes.OK).end();
};

const updatePlayerScore = (req, res) => {
  //schedule_id, player

  // 아근데 내가 투표한 정보에서 가져와야지
  let { schedule_id, voteResult } = req.body;

  let playerArr = Object.keys(voteResult);
  let scoreArr = Object.values(voteResult);
  let sql =
    "UPDATE player SET score = score + ?  WHERE schedule_id = ? AND player = ?";

  playerArr.forEach((player, i) => {
    let value = [Number(scoreArr[i]), schedule_id, player];
    conn.query(sql, value, function (err, result) {
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).end();
        return;
      }
      res.status(StatusCodes.CREATED).end();
    });
  });
};
// 등록됨

const deletePlayerScore = (req, res) => {
  // 일단 점수들을 가지고 있는 result를 가져옴
  let { schedule_id, voter } = req.body;

  let sql = "SELECT voted FROM vote WHERE voter = ? AND schedule_id = ?";
  let value = [voter, schedule_id];

  conn.query(sql, value, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    let voteResult = JSON.parse(result[0].voted);

    let playerArr = Object.keys(voteResult);
    let scoreArr = Object.values(voteResult);
    sql =
      "UPDATE player SET score = score - ? WHERE schedule_id = ? AND player = ?";

    playerArr.forEach((player, i) => {
      let value = [Number(scoreArr[i]), schedule_id, player];
      conn.query(sql, value, function (err, result) {
        if (err) {
          res.status(StatusCodes.BAD_REQUEST).end();
          return;
        }
        res.status(StatusCodes.CREATED).end();
      });
    });
  });
};

const getPlayerData = (req, res) => {
  if (!isAuthorization(req, res)) {
    return;
  }
  let { scheduleDataId } = req.params;
  scheduleDataId = parseInt(scheduleDataId);
  const sql = "SELECT * FROM player WHERE schedule_id = ?";

  conn.query(sql, scheduleDataId, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    res.status(StatusCodes.OK).json(result);
  });
};

// api호출은 각 month마다 1번씩만

const getPlayersData = (req, res) => {
  if (!isAuthorization(req, res)) {
    return;
  }

  let { schedule_id } = req.query;
  schedule_id = schedule_id.split(`,`);

  let sql = "SELECT * FROM player WHERE schedule_id IN (?)";
  conn.query(sql, [schedule_id], (err, results) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    const groupedResults = schedule_id.map((id) => {
      // 현재 schedule_id에 해당하는 결과만 필터링
      const filteredResults = results.filter(
        (result) => result.schedule_id == id
      );
      return filteredResults;
    });

    res.status(StatusCodes.OK).json(groupedResults);

    return;
  });
};

module.exports = {
  insertPlayerData,
  getPlayerData,
  updatePlayerScore,
  deletePlayerScore,
  getPlayersData,
};
