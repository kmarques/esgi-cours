const express = require("express");
const MovieRouter = require("./routes/movies");
const SecurityRouter = require("./routes/security");
const verifyJwt = require("./middlewares/verifyJwt");
const { User } = require("./models/sequelize");

const app = express();

// middlewares
app.use(express.json());

// routers
app.get("/hello", (req, res) => {
  res.json({ msg: "Hello" });
});
app.use(SecurityRouter);
app.use(verifyJwt);
app.use("/movies", MovieRouter);

app.listen(3000, () => console.log("listening..."));
