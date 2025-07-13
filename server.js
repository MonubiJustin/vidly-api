const express = require("express");
const app = express();
const logger = require("./logger/logger");
require("dotenv").config();


require("./startup/config")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/views")(app);
require("./startup/validation")();
require("./startup/prod")(app);


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
  // console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`)
});

module.exports = server;
