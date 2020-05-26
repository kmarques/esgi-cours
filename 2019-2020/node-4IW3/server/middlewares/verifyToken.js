const JWTVerifyToken = require("../lib/jwt-auth").verifyToken;

const verifyToken = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.sendStatus(401);
    return;
  }
  const token = authHeader.replace("Bearer ", "");
  JWTVerifyToken(token)
    .then((payload) => {
      req.user = payload;
      next();
    })
    .catch(() => res.sendStatus(500));
};

module.exports = verifyToken;
