const express = require("express");
const {
  insertPlayerData,
  getPlayerData,
} = require("../contoller/PlayerContoller");
const router = express.Router();

router.route(`/`).post(insertPlayerData);
router.route(`/:scheduleDataId`).get(getPlayerData);

module.exports = router;
