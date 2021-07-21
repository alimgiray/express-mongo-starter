const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./modules/routes"));
app.use(require("./helpers/error-handler"));

module.exports = app;
