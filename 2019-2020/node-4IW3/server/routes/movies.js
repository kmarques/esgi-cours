const express = require("express");
const SakilaFilm = require("../models/SakilaFilms");
const router = express.Router();

const prettifyValidationErrors = (errors) =>
  Object.keys(errors).reduce((acc, field) => {
    acc[field] = errors[field].message;
    return acc;
  }, {});

// CGET
router.get("/", (req, res) => {
  SakilaFilm.find(req.query)
    .then((data) => res.json(data))
    .catch((err) => console.log(err) || res.sendStatus(500));
});

// POST
router.post("/", (req, res) => {
  const movie = new SakilaFilm(req.body);
  movie
    .save()
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).json(prettifyValidationErrors(err.errors));
      } else {
        res.sendStatus(500);
      }
    });
});

// GET
router.get("/:id", (req, res) => {
  SakilaFilm.findById(req.params.id)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch((err) => console.log(err) || res.sendStatus(500));
});

// PUT
router.put("/:id", (req, res) => {
  SakilaFilm.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).json(prettifyValidationErrors(err.errors));
      } else {
        res.sendStatus(500);
      }
    });
});

router.delete("/:id", (req, res) => {
  SakilaFilm.findByIdAndDelete(req.params.id)
    .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
    .catch((err) => res.sendStatus(500));
});

module.exports = router;
