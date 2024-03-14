const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = process.env.VITE_JWT_SECRET;

const makeJwt = (userId) => {
  const token = jwt.sign({ userId: userId }, secret, {
    expiresIn: process.env.VITE_JWT_EXPIRESIN,
    issuer: process.env.VITE_JWT_ISSURE,
  });
  return token;
};

const insertUserInfo = (req, res) => {
  const { userId, userPassword } = req.body;

  const sql = "SELECT * FROM userInfo WHERE user_id = ?;";
  conn.query(sql, userId, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    if (result.length === 0) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    // 여기는 이제 해당 id가 있다는거니까 pwd비교
    const savedSalt = result[0].salt;
    const hashPassword = crypto
      .pbkdf2Sync(
        userPassword,
        savedSalt,
        10000,
        10,
        process.env.VITE_HASH_ALGORITHM
      )
      .toString("base64");
    const savedPassword = result[0].user_password;

    if (hashPassword === savedPassword) {
      // 여기서 이제 jwt를 발급해주어야함
      const token = makeJwt(userId);
      res.cookie("token", token, { httpOnly: true });
      res.status(StatusCodes.OK).json({ ...result[0], token: token });
    } else if (hashPassword !== savedPassword) {
      res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
  //이제 여기서 Db연결해서 해당 id가 있는지 확인하고 있다면 가져오기
};

module.exports = insertUserInfo;
