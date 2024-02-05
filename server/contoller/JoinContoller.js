const crypto = require("crypto");
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const insertUserInfo = (req, res, next) => {
  //유효성 검사 테스트를 못하면
  const { userId, userPassword, userNickname } = req.body;
  //여기서 이제 DB와 연결을 통해 해당
  //여기서 값이 제대로 들어왔는지를 확인해야함

  const salt = crypto.randomBytes(10).toString(process.env.VITE_HASE_BASE);
  const hashPassword = crypto
    .pbkdf2Sync(userPassword, salt, 10000, 10, process.env.VITE_HASH_ALGORITHM)
    .toString(process.env.VITE_HASE_BASE);
  //pbkdf2Sync? => 결국 비밀번호를 암호화하는데 사용됨
  //10000=> 해싱을 몇번? 만번!
  // salt덕분에 해당 비밀번호가 계속 달라질 수 있음
  // 근데 사실 위 crypto는 단방향 즉, 디코딩이안됨 ;;
  // 그럼 Salt를 고정하거나 salt를 데이터베이스에 넣거나 해야한다.
  // 즉, 암호회된 비밀번호와 salt값을 저장
  const sql =
    "INSERT INTO userInfo (user_id,user_password,salt,user_nickname) VALUE(?,?,?,?);";
  const value = [userId, hashPassword, salt, userNickname];
  conn.query(sql, value, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
  });
  res.status(StatusCodes.OK).end();
  return;
};

const getUserInfo = (req, res) => {
  if (req.query) {
    const { input, type } = req.query;
    let sql;
    type === "ID"
      ? (sql = "SELECT * FROM userInfo WHERE user_id = ?;")
      : (sql = "SELECT * FROM userInfo WHERE user_nickname = ?;");

    conn.query(sql, input, function (err, result) {
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).end();
        return;
      }
      //result가 있으면? 중복
      if (result.length !== 0) {
        res.send(true);
        return;
      }
      res.send(false);
      //여기서부터수정
    });
  }
};

module.exports = { insertUserInfo, getUserInfo };
