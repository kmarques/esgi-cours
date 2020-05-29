const verifyToken = require("../lib/jwt").verifyToken;

const verifyJwt = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) res.sendStatus(401);

  const token = authHeader.replace("Bearer ", "");
  verifyToken(token)
    .then((payload) => {
      req.user = payload;
      next();
    })
    .catch((err) => res.status(401).json({ token: [err] }));
};

module.exports = verifyJwt;
