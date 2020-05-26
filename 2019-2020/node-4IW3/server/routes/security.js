const { Router } = require("express");
const createToken = require("../lib/jwt-auth").createToken;

const router = Router();

router.post("/login_check", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password === "pass") {
    // create jwt
    createToken({ username })
      .then((token) => res.json({ token }))
      .catch(() => res.sendStatus(500));
  } else {
    res.status(401).json({
      username: "Invalid credentials",
      password: "Invalid credentials",
    });
  }
});

module.exports = router;
