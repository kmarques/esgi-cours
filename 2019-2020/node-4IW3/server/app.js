const express = require("express");
const movieRouter = require("./routes/movies");
const securityRouter = require("./routes/security");
const paymentRouter = require("./routes/payment");
const UserRouter = require("./routes/users");
const verifyToken = require("./middlewares/verifyToken");
const mustacheExpress = require("mustache-express");

const app = express();
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded());
app.get("/hello", (req, res) => {
  res.json({ msg: "Hello" });
});

app.use(paymentRouter);
app.use(securityRouter);
app.use(verifyToken);
app.use("/users", UserRouter);
app.use("/movies", movieRouter);

app.listen(3000, () => console.log("listening..."));
