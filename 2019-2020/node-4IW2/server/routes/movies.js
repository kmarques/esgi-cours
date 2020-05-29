const Router = require("express").Router;
const Movie = require("../models/SakilaFilms");
const router = Router();

/** Collection Routes  **/
// CGET
router.get("/", (req, res) => {
  Movie.find()
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

// POST
router.post("/", (req, res) => {
  const movie = new Movie(req.body);
  movie
    .save()
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).json(prettifyErrors(Object.values(err.errors)));
      } else {
        res.sendStatus(500);
      }
    });
});

/** Item Routes  **/
router.get("/:id", (req, res) => {
  Movie.findById(req.params.id)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch(() => res.sendStatus(500));
});

router.delete("/:id", (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
    .catch(() => res.sendStatus(500));
});

const prettifyErrors = (errors) => {
  return errors.reduce((acc, item) => {
    acc[item.path] = [...(acc[item.path] || []), item.message];

    return acc;
  }, {});
};

router.put("/:id", (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).json(prettifyErrors(Object.values(err.errors)));
      } else {
        res.sendStatus(500);
      }
    });
});

module.exports = router;
