const express = require("express");
const router = express.Router();
const { getUserList } = require("../controllers/users");

router.get("/api/users", getUserList);

module.exports = router;
