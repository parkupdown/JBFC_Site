const express = require("express");
const {
  postCommentData,
  getCommentData,
  deleteCommentData,
} = require("../contoller/CommentController");
const router = express.Router();

router.route(`/`).post(postCommentData);
router.route(`/:boardId`).get(getCommentData);
router.route(`/:commentId`).delete(deleteCommentData);
module.exports = router;
