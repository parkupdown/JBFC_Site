const express = require("express");
const { body } = require("express-validator");
const validate = require("../validatior");
const insertUserInfo = require("../contoller/LoginController");

const router = express.Router();
router
  .route("/")
  .post(
    [
      body("userId").notEmpty().isString(),
      body("userPassword").notEmpty().isString(),
      validate,
    ],
    insertUserInfo
  );

module.exports = router;
