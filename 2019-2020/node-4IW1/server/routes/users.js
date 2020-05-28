const express = require("express");
const User = require("../models/sequelize/User");
const { ValidationError, Op } = require("sequelize");

const router = express.Router();

// CGET
router.get("/", (req, res) => {
  const { username, ...conditions } = req.query;
  if (username) {
    conditions.username = { [Op.startsWith]: req.query.username };
  }

  User.findAll({
    where: conditions,
    attributes: ["username", "firstname", "lastname", "confirmed"],
  }).then((data) => res.json(data));
});

// POST
router.post("/", (req, res) => {
  User.create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((error) => {
      if (error instanceof ValidationError) {
        console.log(error.errors);
        const errors = error.errors.reduce((acc, item) => {
          acc[item.path] = [...(acc[item.path] || []), item.message];
          return acc;
        }, {});
        res.status(400).json(errors);
      } else {
        res.sendStatus(500);
      }
    });
});

// GET
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id).then((data) =>
    data ? res.json(data) : res.sendStatus(404)
  ).catch(err => res.sendStatus(500));
});

// PUT
router.put("/:id", (req, res) => {});

// DELETE
router.delete("/:id", (req, res) => {});

module.exports = router;
