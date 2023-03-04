const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("api running in router");
  });

  router.post('/register', (req, res)=>{
    console.log(req.body);
    res.json({message:req.body})
    // res.send("sending data");
  })

  module.exports = router;