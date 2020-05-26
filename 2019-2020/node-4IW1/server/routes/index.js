const MovieRouter = require("./movies");
const SecurityRouter = require("./security");
const verifyToken = require("../middlewares/verifyToken");

function routerManager(app) {
  app.use("/", SecurityRouter);
  app.use(verifyToken);
  app.use("/movies", MovieRouter);
}

module.exports = routerManager;
