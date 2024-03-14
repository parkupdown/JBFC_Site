const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const { isAuthorization } = require("./CheckAuthorization");

const insertPlayerData = (req, res) => {
  if (!isAuthorization(req, res)) {
    return;
  }
  const { playerNames, schedule_id } = req.body;
  // playerName만큼 query날리면됨
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

module.exports = { insertPlayerData, getPlayerData };
