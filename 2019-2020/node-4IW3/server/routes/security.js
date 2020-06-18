const { Router } = require("express");
const createToken = require("../lib/jwt-auth").createToken;
const { User } = require("../models/sequelize");
const bcrypt = require("bcryptjs");
const router = Router();

router.post("/login_check", (req, res) => {
  const { username, password } = req.body;

  User.findOne({
    where: { username },
  })
    .then((data) => {
      if (!data) {
        res.status(401).json({
          username: "Invalid credentials",
          password: "Invalid credentials",
        });
      } else {
        bcrypt.compare(password, data.password).then((result) => {
          if (result) {
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
      }
    })
    .catch(() => res.sendStatus(500));
});

// POST
// Tester avec champs supplémentaires
router.post("/users", (req, res) => {
  User.create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      if (err instanceof ValidationError) {
        res.status(400).json(prettifyValidationErrors(err.errors));
      } else {
        res.sendStatus(500);
      }
    });
});

module.exports = router;
