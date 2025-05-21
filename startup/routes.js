const customers = require("../routes/customers");
const movies = require("../routes/movies");
const genres = require("../routes/genres");
const home = require("../routes/home");
const rentals = require("../routes/rentals");
const register = require("../routes/register");
const auth = require("../routes/auth");
const morgan = require("morgan");
const error = require("../middleware/error");
const express = require('express')

module.exports = function (app) {
  // middleware
  app.use(express.json());

  // Initialize Swagger
  // swaggerDocs(app)

  app.use(morgan("tiny"));
  app.use("/", home);
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", register);
  app.use("/api/login", auth);
  app.use(error);
};
