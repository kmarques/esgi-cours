const express = require("express");
const cors = require("cors");
const { User } = require("./models/sequelize");
const RouterManager = require("./routes");
const mustacheExpress = require("mustache-express");
const app = express();

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/hello", (req, res, next) => {
  console.log(req.query);
  res.json({ msg: "Hello" });
});

RouterManager(app);

app.listen(3000, () => console.log("listening..."));
