const express = require("express");
const router = express.Router();
const movieController = require('../controllers/movieController')
const validateObjectID = require('../middleware/validateObjectIds')
const validate = require('../middleware/validater')
const { vd_movie } = require('../validators/movieValidator')


/**
 * @swagger
 * /api/v1/movies:
 *  get:
 *      tags:
 *          - movies
 *      summary: Retrieve all movies
 *      description: Returns all movies to verify the get method functionality
 *      responses:
 *          200:
 *              description: Successfully retrieved all the movies
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Movie'
 */
router.get("/", movieController.getMovies);

/**
 * @swagger
 * /api/v1/movies/{id}:
 *  get:
 *      tags:
 *          - movies
 *      summary: Getting a single movie
 *      description: fetching a single movie using its unique ID
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            descrption: ID of the movie
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Movie'
 *          400:
 *              description: Bad Request - Validation error or Invalid input
 *          401:
 *              description: Unauthorized - No valid auth token
 *          403:
 *              description: Forbidden - Access Denied
 *          404:
 *              description: Not Found - no resource with the given ID
 *          500:
 *              description: Internal Server Error - Something went wrong
 */
router.get( "/:id", validateObjectID, movieController.getMovie);  // getting a specific movie

/**
 * @swagger
 * /api/v1/movies:
 *  post:
 *      tags:
 *          - movies
 *      summary: Create new Movie
 *      description: Add newl created movie to the databases
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Movie'
 *      responses:
 *          201:
 *              description: Movie created successfully
 *          400:
 *              description: Bad Request - Validation or input errors
 *          401:
 *              description: Unauthorized - No valid auth token
 *          409:
 *              description: Conflict - Movie already exists
 *          500:
 *              description: Internal Server Error - Something went wrong
 */
router.post("/", validate(vd_movie), movieController.addMovie);  // creating a new movie object

/**
 * @swagger
 * /api/v1/movies/{id}:
 *  put:
 *      tags:
 *          - movies
 *      summary: Update existing movie
 *      description: Fetch movie by its unique ID and update it
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Movie ID
 *            schema:
 *                 type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Movie'
 *      responses:
 *          200:
 *              description: OK - Movie updated successfully
 *          400:
 *              description: Bad Request - Validation or input errors
 *          401:
 *              description: Unauthorized - No valid auth token
 *          500:
 *              description: Internal Server Error - Something went wrong
 */
router.put("/:id", validate(vd_movie), movieController.updateMovie);  // updating a movie


/**
 * @swagger
 * /api/v1/movies/{id}:
 *  delete:
 *      tags:
 *          - movies
 *      summary: Delete existing Movie
 *      description: Fetch movie by its unique ID and delete it
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID of Movie
 *            schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: OK - Movie deleted Successfully
 *          400:
 *              description: Bad Request - Validation or input errors
 *          401:
 *              description: Unauthorized - No valid auth token
 *          404:
 *              description: Not Found - Movie with the given ID not found
 *          500:
 *              description: Internal Server Error - Something went wrong
 */
router.delete("/:id", validateObjectID, movieController.deleteMovie);  // deleting a movie


module.exports = router;
