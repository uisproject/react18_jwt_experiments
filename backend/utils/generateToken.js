const jwt = require("jsonwebtoken");

const generateAccessToken = (data = {}) => {
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN, {
    expiresIn: "5s",
  });

  return accessToken;
};

const generateRefreshToken = (data = {}) => {
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN);

  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
