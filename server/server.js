const express = require("express");
const app = express();
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'})
require('./db/conn');

const PORT = process.env.PORT;

  app.get("/", (req, res) => {
    res.send("api running");
  });

app.listen(PORT);
