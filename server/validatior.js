const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const validate = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json(err.array());
    return;
    // 그래서 next가있음
    // 미들웨어에서 함수가 끊겨버리는것을방지함
  }
  return next();
};

module.exports = validate;
