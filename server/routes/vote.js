const express = require("express");
const {
  getVoteUserData,
  insertVoteUserData,
  deleteVoteUserData,
  getVotesData,
} = require("../contoller/VoteController");
const router = express.Router();

router.route("/:schedule_id").get(getVoteUserData);
router
  .route("/")
  .post(insertVoteUserData)
  .delete(deleteVoteUserData)
  .get(getVotesData);

module.exports = router;
