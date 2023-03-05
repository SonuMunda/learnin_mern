const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(express.json());
app.use(require("./router/auth"));

const PORT = process.env.PORT;

const Middleware = function (req, res, next) {
  // Perform some operation
  console.log("This is my middleware function");

  // Pass control to the next middleware function or to the route handler
  next();
};

// app.get("/", (req, res) => {
//   res.send("api running");
// });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
