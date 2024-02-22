const express = require("express");
const {
  insertSchedule,
  getSchedule,
  getScheduleDetail,
  updateSchedule,
  deleteSchedule,
  getTodaySchedule,
} = require("../contoller/ScheduleController");

const router = express.Router();

router
  .route(`/`)
  .post(insertSchedule)
  .get(getSchedule)
  .put(updateSchedule)
  .delete(deleteSchedule);
router.route(`/detail`).get(getScheduleDetail);
router.route(`/today`).get(getTodaySchedule);
module.exports = router;
