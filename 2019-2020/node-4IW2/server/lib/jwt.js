const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        algorithm: "HS256",
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) reject();
        resolve(token);
      }
    );
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) reject(err);
      resolve(payload);
    });
  });
};

module.exports = {
  createToken,
  verifyToken,
};
