const { User } = require("../models/sequelize");
const bcrypt = require("bcrypt");

const Router = require("express").Router;
const createToken = require("../lib/jwt").createToken;
const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({
    where: { username },
  }).then((user) => {
    if (!user) {
      res.status(401).json({
        username: ["Invalid credentials"],
        password: ["Invalid credentials"],
      });
    } else {
      bcrypt.compare(password, user.password).then((valid) => {
        if (valid) {
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
    }
  });
});

// POST
router.post("/users", (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      if (err.name === "SequelizeValidationError") {
        res.status(400).json(prettifyErrors(Object.values(err.errors)));
      } else {
        res.sendStatus(500);
      }
    });
});

module.exports = router;
