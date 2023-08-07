const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect-mongo.js");
require("express-async-errors");
const authenticateUser = require("./middleware/auth.js");
const mainRouter = require("./routes/user.js");
const postsRouter = require("./routes/posts.js");
const productsRouter = require("./routes/product.js");
const errorHandeler = require("./middleware/error-handeler.js");
const StatusCodes = require("http-status-codes");

const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/", mainRouter);
app.use("/api/v1/", authenticateUser);
app.use("/api/v1/posts/", postsRouter);
app.use("/api/v1/products/", productsRouter);

app.use(errorHandeler);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).send(`<h1>Route Not Found</h1>`);
});

const start = () => {
  connectDB(process.env.MONGO_URI);
  app.listen(port, console.log(`listening on port ${port}...`));
};

start();
