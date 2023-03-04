const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'})

const DB = process.env.DATABASE;
const PORT = process.env.PORT;
mongoose
  .connect(DB)
  .then(() => {
    console.log("database connected");
    
  })
  .catch((Error) => {
    console.log(Error);
  });

  app.get("/", (req, res) => {
    res.send("api running");
  });

app.listen(PORT);
