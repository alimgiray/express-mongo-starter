const express = require("express");
const router = express.Router();
const Joi = require("joi");

const validate = require("../../helpers/validate-request");

const userService = require("./user.service");

router.post("/login", loginSchema, login);
router.post("/register", registerSchema, register);
module.exports = router;

function loginSchema(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  validate(req, next, schema);
}

function login(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  userService
    .login(username, password)
    .then((token) => res.json({ token: token }))
    .catch(next);
}

function registerSchema(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  validate(req, next, schema);
}

function register(req, res, next) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  userService
    .register(username, email, password)
    .then((token) => res.json({ token: token }))
    .catch(next);
}
