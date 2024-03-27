const express = require("express");
const {
  insertPlayerData,
  getPlayerData,
  updatePlayerScore,
  deletePlayerScore,
} = require("../contoller/PlayerContoller");
const router = express.Router();

router.route(`/`).post(insertPlayerData).put(updatePlayerScore);
router.route(`/:scheduleDataId`).get(getPlayerData);
router.route(`/cancel`).put(deletePlayerScore);

module.exports = router;
