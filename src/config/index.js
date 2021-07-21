require("dotenv").config();

const getVar = (x) => process.env[x];

function assertVar(x) {
  var value = getVar(x);
  if (!value) {
    throw new Error(`Environment variable ${x} is required`);
  }
  return value;
}

let config = {
  mongoURI: assertVar("MONGO_URI"),
  jwtSecret: assertVar("JWT_SECRET"),
  port: getVar("PORT"),
};

module.exports = config;
