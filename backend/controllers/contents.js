const userList = require("../data/userList");

const getProfile = (req, res) => {
  res.status(200).json({ message: "hi there!" });
};

module.exports = { getProfile };
