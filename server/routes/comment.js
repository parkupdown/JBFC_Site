const express = require("express");
const {
  postCommentData,
  getCommentData,
} = require("../contoller/CommentController");
const router = express.Router();

router.route(`/`).post(postCommentData);
router.route(`/:boardId`).get(getCommentData);
module.exports = router;
