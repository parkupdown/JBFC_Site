const express = require("express");
const {
  insertPlayerData,
  getPlayerData,
  updatePlayerScore,
  deletePlayerScore,
  getPlayersData,
} = require("../contoller/PlayerContoller");
const router = express.Router();

router
  .route(`/`)
  .post(insertPlayerData)
  .put(updatePlayerScore)
  .get(getPlayersData);
router.route(`/:scheduleDataId`).get(getPlayerData);
router.route(`/cancel`).put(deletePlayerScore);

module.exports = router;
