const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const insertSchedule = (req, res) => {
  let { month, day, ground, time, num_of_player, type_of_match, price } =
    req.body;
  const sql =
    "INSERT INTO schedule (month, day, ground,time, num_of_player, type_of_match, price) VALUE (?,?,?,?,?,?)";
  const value = [month, day, ground, time, num_of_player, type_of_match, price];

  conn.query(sql, value, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    const newData = {
      id: result.insertId,
      month: month,
      day: day,
      ground: ground,
      time: time,
      num_of_player: num_of_player,
      type_of_match: type_of_match,
      price: price,
    };

    res.status(StatusCodes.CREATED).json(newData);
    return;
  });
};
const updateSchedule = (req, res) => {
  let { month, day, ground, time, num_of_player, type_of_match, price } =
    req.body;
  const sql =
    "UPDATE schedule SET ground =? , time = ?, num_of_player=?,type_of_match= ?,price=? WHERE month=? AND day=?;";
  const value = [ground, time, num_of_player, type_of_match, price, month, day];

  conn.query(sql, value, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    res.status(StatusCodes.CREATED).end();
  });
};

const deleteSchedule = (req, res) => {
  const { month, day } = req.query;
  const sql = "DELETE FROM schedule WHERE month=? AND day=?;";
  const value = [month, day];

  conn.query(sql, value, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    conn.query("SELECT * FROM schedule;", function (err, result) {
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).end();
        return;
      }

      res.status(StatusCodes.OK).json(result);
    });
  });
};

const getSchedule = (req, res) => {
  const { month } = req.query;
  const sql = "SELECT * FROM schedule WHERE month = ?";

  conn.query(sql, month, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    res.status(StatusCodes.OK).json(result);
    return;
  });
};

const getScheduleDetail = (req, res) => {
  const { day, month } = req.query;

  const sql = "SELECT * FROM schedule WHERE month = ? AND day = ? ";
  const value = [day, month];
  conn.query(sql, value, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_GATEWAY).end();
      return;
    }
    res.status(StatusCodes.OK).json(result);
  });
};

const getTodaySchedule = (req, res) => {
  const { month, day } = req.query;
  console.log(month, day);
  const sql = "SELECT * FROM schedule WHERE month = ? AND day = ?;";
  const value = [month, day];
  conn.query(sql, value, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    res.status(StatusCodes.OK).json(result);
  });
};

module.exports = {
  insertSchedule,
  getSchedule,
  getScheduleDetail,
  updateSchedule,
  deleteSchedule,
  getTodaySchedule,
};
