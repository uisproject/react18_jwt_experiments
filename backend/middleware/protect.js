const jwt = require("jsonwebtoken");
const storedRefreshToken = require("../controllers/auths").storedRefreshToken;

const validateToken = (req, res, next) => {
  if (storedRefreshToken.length <= 0) {
    res.status(403);
    throw new Error("No refresh token");
  }

  const { headers } = req;
  const { authorization } = headers;
  const accessToken = authorization.split(" ")[1];

  // console.log(jwt.decode(accessToken));
  console.log(accessToken);

  jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      // console.log(err.expiredAt);
      // console.log(err.message);
      // console.log(err.date);
      res.status(401);
      throw new Error(err.message);
    }
    // console.log(decoded);
    next();

    return decoded;
  });
};

module.exports = validateToken;
