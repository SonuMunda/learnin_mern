const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("API running in router");
});

/*
promises method
router.post("/register", (req, res) => {
  // Array destructuring
  const { name, email, phone, password, cpassword } = req.body;
  // Validation
  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  User.findOne({ email: email })
    .then((userExists) => {
      if (userExists) {
        return res.status(422).json({ error: "Email already exists" });
      }
      const newUser = new User({ name, email, phone, password, cpassword });

      newUser
        .save()
        .then(() => {
          res.status(201).json({ success: "You are successfully registered" });
        })
        .catch((err) => {
          res.status(500).json({ error: "Something went wrong 1" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});
*/

// async method

router.post("/register", async (req, res) => {
  try {
    let token;
    const { name, email, phone, password, cpassword } = req.body;

    if (!name || !email || !phone || !password || !cpassword) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ error: "Email already exists" });
    }

    const newUser = new User({ name, email, phone, password, cpassword });
    await newUser.save();

    res.status(201).json({ success: "You are successfully registered" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the fields" });
    }
    //checking email exists or not
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      if (!isMatch) {
        res.status(400).json({ message: "invalid credential" });
      } else {
        res.json({ message: "login successful" });
      }
    } else {
      res.status(400).json({ message: "invalid credential" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
