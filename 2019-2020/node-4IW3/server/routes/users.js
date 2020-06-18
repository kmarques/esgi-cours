const express = require("express");
const { User } = require("../models/sequelize");
const router = express.Router();
const { Op, ValidationError } = require("sequelize");

const prettifyValidationErrors = (errors) =>
  errors.reduce((acc, field) => {
    acc[field.path] = [...(acc[field.path] || []), field.message];
    return acc;
  }, {});

// CGET
// /users?lastname=test&firstname=test&username=test
// => {lastname: "test", firstname: "test", username: "test"}
// WHERE lastname = 'test' AND firstname = 'test' AND username like 'test%'
/**
 * findAll({
 *    where: {
 *      lastname: 'test', => = 'test'
 *      firstname: 'test', => = 'test'
 *      username: {
 *          [Op.startsWith]: 'test' => LIKE 'test%'
 *      }
 *    }
 * })
 *
 * Test filtrage des données
 */
router.get("/", (req, res) => {
  const { username, ...conditions } = req.query;
  if (username) {
    conditions.username = {
      [Op.startsWith]: username,
    };
  }

  User.findAll({
    where: conditions,
    attributes: ["firstname", "lastname", "username", "id"],
  })
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

// GET
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch((err) => console.log(err) || res.sendStatus(500));
});

// PUT
router.put("/:id", (req, res) => {
  User.update(req.body, { where: { id: req.params.id }, returning: true })
    .then(([nbUpdated, result]) =>
      nbUpdated ? res.json(result[0]) : res.sendStatus(404)
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).json(prettifyValidationErrors(err.errors));
      } else {
        res.sendStatus(500);
      }
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
    .catch((err) => res.sendStatus(500));
});

module.exports = router;
