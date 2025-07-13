const customers = require("../routes/customers");
const movies = require("../routes/movies");
const genres = require("../routes/genres");
const home = require("../routes/home");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const morgan = require("morgan");
const error = require("../middleware/error");
const express = require("express");
const notFound = require("../middleware/notFound");
const swaggerDocs = require('./swagger')

  

module.exports = function (app) {
  // middleware
  app.use(express.json());

  // Initialize Swagger
  // swaggerDocs(app)

  app.use(morgan("tiny"));
  app.use("/", home);
  app.use("/api/v1/genres", genres);
  app.use("/api/v1/customers", customers);
  app.use("/api/v1/movies", movies);
  app.use("/api/v1/rentals", rentals);
  app.use("/api/v1/users", users);
  swaggerDocs(app)

  // Handle 404 - Not Found
  app.use(notFound);

  // Error handling middleware
  app.use(error);
};
