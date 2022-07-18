const express = require("express");
const router = express.Router();
const { validateUser, refreshToken } = require("../controllers/auths");

router.post("/api/login", validateUser);
router.get("/api/refresh", refreshToken);

module.exports = router;
