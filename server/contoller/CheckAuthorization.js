const { StatusCodes } = require("http-status-codes");
const { decodeJwt } = require("./DecodedJwt");
const jwt = require("jsonwebtoken");

const isAuthorization = (req, res) => {
  let decodedJwt = decodeJwt(req, res);

  if (decodedJwt instanceof jwt.TokenExpiredError) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "로그인 세션이 만료되었습니다." });
    return false;
  } else if (decodedJwt instanceof jwt.JsonWebTokenError) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "잘못된 토큰입니다." });
    return false;
  }

  return true;
};
module.exports = { isAuthorization };
