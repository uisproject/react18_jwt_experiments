const express = require("express");
const server = express();
const dotenv = require("dotenv");
const { customError, notFound } = require("./middleware/error");
const userRoutes = require("./routers/users");
const authRoutes = require("./routers/auths");
const profileRoutes = require("./routers/contents");

dotenv.config();
server.use(express.json());

server.use(userRoutes);
server.use(authRoutes);
server.use(profileRoutes);

server.use([notFound, customError]);

server.listen(5000, () => console.log("Listening to port 5000"));
