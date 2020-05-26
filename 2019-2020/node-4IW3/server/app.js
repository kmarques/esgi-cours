const express = require("express");
const movieRouter = require("./routes/movies");
const securityRouter = require("./routes/security");
const verifyToken = require("./middlewares/verifyToken");

const app = express();

app.use(express.json());
app.get("/hello", (req, res) => {
  res.json({ msg: "Hello" });
});
app.use(securityRouter);
app.use(verifyToken);
app.use("/movies", movieRouter);

app.listen(3000, () => console.log("listening..."));
