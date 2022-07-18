const notFound = (req, res, next) => {
  res.status(404);
  throw new Error("URI is not found");
};

const customError = (err, req, res, next) => {
  const body = {
    statusCode: res.statusCode,
    message: err.message,
  };
  res.json(body);
};

module.exports = { notFound, customError };
