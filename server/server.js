const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'})

const DB = process.env.DATABASE;
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

app.listen(3001);
