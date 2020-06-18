const express = require("express");
const MovieRouter = require("./routes/movies");
const UserRouter = require("./routes/users");
const SecurityRouter = require("./routes/security");
const verifyJwt = require("./middlewares/verifyJwt");
const cors = require("cors");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routers
app.get("/hello", (req, res) => {
  res.json({ msg: "Hello" });
});
app.use(SecurityRouter);
app.use(verifyJwt);
app.use("/users", UserRouter);
app.use("/movies", MovieRouter);

app.listen(3000, () => console.log("listening..."));
