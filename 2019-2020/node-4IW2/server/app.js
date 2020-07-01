const express = require("express");
const MovieRouter = require("./routes/movies");
const UserRouter = require("./routes/users");
const SecurityRouter = require("./routes/security");
const PaymentRouter = require("./routes/payment");
const verifyJwt = require("./middlewares/verifyJwt");
const cors = require("cors");
const mustacheExpress = require("mustache-express");
const app = express();

// Integrate view engine
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

// middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// routers
app.get("/hello", (req, res) => {
  res.json({ msg: "Hello" });
});
app.use(PaymentRouter);
app.use(SecurityRouter);
app.use(verifyJwt);
app.use("/users", UserRouter);
app.use("/movies", MovieRouter);

app.listen(3000, () => console.log("listening..."));
