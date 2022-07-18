const userList = require("../data/userList");

const getUserList = (req, res) => {
  res.json(userList);
};

module.exports = { getUserList };
