const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

function decodeJwt(req, res) {
  try {
    let receivedJwt = req.headers["authorization"];
    let decodedJwt = jwt.verify(receivedJwt, process.env.VITE_JWT_SECRET);

    return decodedJwt;
  } catch (error) {
    return error;
  }
}

module.exports = { decodeJwt };
