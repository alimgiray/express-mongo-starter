const mongoose = require("mongoose");
const config = require("../config");

const mongoURI = config.mongoURI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  throw new Error(`unable to connect to database`);
});
