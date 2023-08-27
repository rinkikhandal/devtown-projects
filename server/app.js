const express = require("express");
require("express-async-errors");
const connectDb = require("./db/connectDb.js");
const UserRoutes = require("./routers/user.js");
const TodoRoutes = require("./routers/todos.js");
const errorHandeler = require("./middlewares/errorHandeler.js");
const statusCode = require("http-status-codes");
const authorization = require("./middlewares/authorization.js");
require("dotenv").config();
const cors = require("cors");
const app = express();

const port = process.env.PORT || 1212;
app.use(cors());
app.use(express.json());
app.use("/api/user", UserRoutes);
app.use("/api/user/todos", authorization);
app.use("/api/user/todos", TodoRoutes);

app.use(errorHandeler);
app.get("*", (req, res) => {
  res
    .status(statusCode.NOT_FOUND)
    .json({ success: false, msg: "page not found" });
});

const start = (PORT) => {
  connectDb(process.env.MONGO_URI);
  app.listen(PORT, console.log(`app listening on port ${PORT}...`));
};

start(port);
