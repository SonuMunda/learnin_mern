const express = require("express");
const router = express.Router();

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("API running in router");
});

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

module.exports = router;
