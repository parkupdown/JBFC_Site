const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const {
  insertBoardData,
  getBoardData,
  getBoardDetailData,
} = require("../contoller/BoardController");

router
  .route(`/`)
  .post(upload.single("image"), insertBoardData)
  .get(getBoardData);

router.route("/detail/:id").get(getBoardDetailData);

module.exports = router;
