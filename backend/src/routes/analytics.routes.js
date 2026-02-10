const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");
const { getUserStats } = require("../controllers/analytics.controller");

router.get(
  "/users",
  auth,
  requireRole("admin"),
  getUserStats
);

module.exports = router;
