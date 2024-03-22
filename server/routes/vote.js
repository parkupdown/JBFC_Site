const express = require("express");
const {
  getVoteUserData,
  insertVoteUserData,
  deleteVoteUserData,
} = require("../contoller/VoteController");
const router = express.Router();

router
  .route("/vote:schedule_id")
  .get(getVoteUserData)
  .delete(deleteVoteUserData);
router.route("/vote").post(insertVoteUserData);

module.exports = router;
