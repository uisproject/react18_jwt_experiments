const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const userList = require("../data/userList");
const jwt = require("jsonwebtoken");

const storedRefreshToken = [];

const validateUser = (req, res) => {
  const { username, password } = req.body;

  const usernameIsExist = userList.find((user) => user.username === username);

  if (!usernameIsExist) {
    res.status(400);
    throw new Error("Username is not exist");
  }

  if (usernameIsExist.password !== password) {
    res.status(400);
    throw new Error("Password is not correct");
  }

  storedRefreshToken.push(generateRefreshToken({ username }));

  const body = {
    type: "Bearer",
    accessToken: generateAccessToken({ username }),
  };

  res.status(200).json(body);
};

const refreshToken = (req, res) => {
  // verify the refresh token
  if (storedRefreshToken.length <= 0) {
    res.status(403);
    throw new Error("No refresh token");
  }

  const verifiedRefreshToken = jwt.verify(
    storedRefreshToken[0],
    process.env.REFRESH_TOKEN,
    (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error(err.message);
      }
      return decoded;
    }
  );

  const newAccessToken = generateAccessToken({
    username: verifiedRefreshToken.username,
  });

  const body = {
    type: "Bearer",
    accessToken: newAccessToken,
  };

  res.status(200).json(body);
};

module.exports = { validateUser, refreshToken, storedRefreshToken };
