const createToken = require("../lib/auth").createToken;
const express = require("express");
const router = express.Router();

// POST
router.post("/login_check", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password === "pass") {
    createToken({ username })
      .then((token) => res.json({ token }))
      .catch(() => res.sendStatus(500));
  } else {
    res.send(400).json({
      username: "Invalid credentials",
      password: "Invalid credentials",
    });
  }
});

module.exports = router;
