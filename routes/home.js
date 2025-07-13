const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *      tags:
 *        - home
 *      summary: Retrieve the homepage
 *      description: Returns the homepage with a title and a welcome message to verify the GET method functionality.
 *      responses:
 *          200:
 *              description: Successfully retrieved the homepage.
 *              content:
 *                  text/html:
 *                      schema:
 *                          type: string
 *                          example: "<!DOCTYPE html><html><head><title>title</title></head><body><h1>Hello World!</h1></body></html>"
 *          500:
 *              description: Internal server error.
 */
router.get("/", (req, res) => {
  res.render("index", { title: "title", message: "Hello World!" });
});

module.exports = router;
