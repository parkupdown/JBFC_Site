const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { insertUserInfo, getUserInfo } = require("../contoller/JoinContoller");
const validate = require("../validatior");

router
  .route(`/`)
  .post(
    [
      body("userId").notEmpty().isString(),
      body("userPassword").notEmpty().isString(),
      body("userNickname").notEmpty().isString(),
      validate,
    ],
    insertUserInfo
  )
  .get(getUserInfo);

module.exports = router;
