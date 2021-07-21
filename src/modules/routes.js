const express = require("express");
const router = express.Router();

// Heartbeat
router.get("/alive", alive);
function alive(req, res) {
  res.send({ msg: "alive" });
}

router.use("/user", require("./user/user.controller"));

module.exports = router;
