const config = require("./src/config");
const server = require("./src/app");
require("./src/mongo");

server.listen(config.port, () => {
  console.log(`App listening at http://localhost:${config.port}`);
});
