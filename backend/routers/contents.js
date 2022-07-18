const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const { getProfile } = require("../controllers/contents");

router.route("/api/profile").get(protect, getProfile);
router.route("/api/comments").get();

module.exports = router;
