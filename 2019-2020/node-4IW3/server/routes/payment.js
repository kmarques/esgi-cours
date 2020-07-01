const { Router } = require("express");
const router = Router();
const SakilaFilms = require("../models/SakilaFilms");

// GET
router.get("/payment/:id", (req, res) => {
  SakilaFilms.find().then((data) => {
    res.render("payment", {
      movies: data,
      paymentId: req.params.id,
    });
  });
});

// POST
router.post("/payment/:id", (req, res) => {
  res.json(req.body);
});

module.exports = router;
