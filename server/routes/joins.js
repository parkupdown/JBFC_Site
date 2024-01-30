const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { insertUserInfo, getUserInfo } = require("../contoller/JoinContoller");
const joinValidate = require("../validatior");

router
  .route(`/`)
  .post(
    [
      body("userId").notEmpty().isString(),
      body("userPassword").notEmpty().isString(),
      body("userNickname").notEmpty().isString(),
      joinValidate,
    ],
    insertUserInfo
  )
  .get(getUserInfo);

module.exports = router;
