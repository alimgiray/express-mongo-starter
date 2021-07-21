const jwt = require("jsonwebtoken");
const config = require("../../config");
const secret = config.jwtSecret;

const User = require("./user.model");

module.exports = {
  register,
  login,
};

async function register(username, email, password) {
  const user = new User({ username, email });
  user.generatePassword(password);
  await user.save();
  return await login(username, password);
}

async function login(username, password) {
  const user = await User.getByUsername(username);
  if (user.validPassword(password)) {
    return jwt.sign({ sub: user.id }, secret, {
      expiresIn: "7d",
    });
  } else {
    throw new Error("Wrong password");
  }
}
