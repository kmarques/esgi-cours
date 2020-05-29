const Router = require("express").Router;
const createToken = require("../lib/jwt").createToken;
const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password === "pass") {
    createToken({ username })
      .then((token) => res.json({ token }))
      .catch(() => res.sendStatus(500));
  } else {
    res.status(401).json({
      username: ["Invalid credentials"],
      password: ["Invalid credentials"],
    });
  }
});

module.exports = router;
