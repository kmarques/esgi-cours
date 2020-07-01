const createToken = require("../lib/auth").createToken;
const express = require("express");
const router = express.Router();
const User = require("../models/sequelize/User");
const bcrypt = require("bcryptjs");
const SakilaFilm = require("../models/SakilaFilm");

// POST
router.get("/payment/:id", (req, res) => {
  SakilaFilm.find()
    .then((data) => {
      res.render("payment", {
        movies: data,
        paymentID: req.params.id,
      });
    })
    .catch((e) => res.json({ message: e.message }));
});

router.post("/payment/:id", (req, res) => {
  res.json(req.body);
});

module.exports = router;
