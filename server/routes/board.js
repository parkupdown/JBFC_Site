const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  insertBoardData,
  getBoardData,
  getBoardDetailData,
  getLastestBoardData,
  getMyBoardData,
  deleteBoardData,
} = require("../contoller/BoardController");

router
  .route(`/`)
  .post(upload.single("image"), insertBoardData)
  .get(getBoardData);

router.route("/detail/:id").get(getBoardDetailData);

router.route(`/lastest`).get(getLastestBoardData);

router.route("/mine/:nickname").get(getMyBoardData);

router.route("/mine/:deleteBoardIdArr").delete(deleteBoardData);

module.exports = router;
