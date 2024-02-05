const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.route("/").get((req, res) => {
  try {
    const { token } = req.cookies;
    const data = jwt.verify(token, "tkdgkaos");
    res.json(data);
  } catch (error) {
    throw new Error("세션이 만료되었습니다.");
  }
});

module.exports = router;
