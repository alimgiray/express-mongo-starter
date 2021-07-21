const jwt = require("express-jwt");
const config = require("../config");
const secret = config.jwtSecret;

function authorize() {
  return [
    jwt({ secret, algorithms: ["HS256"] }),
    async (err, req, res, next) => {
      if (err.name === "UnauthorizedError") {
        res.sendStatus(401);
        return;
      }
      next();
    },
  ];
}

module.exports = authorize;
