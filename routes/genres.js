const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const validateObjectIds = require("../middleware/validateObjectIds");
const genreController = require("../controllers/genreController");
const { vd_genres } = require("../validators/genreValidator");
const validate = require("../middleware/validater");

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

/**
 * @swagger
 * /api/v1/genres:
 *  get:
 *      tags:
 *          - genres
 *      summary: Retrieve all genres
 *      description: Returns all the genres to verify the GET method functionality.
 *      responses:
 *          200:
 *              description: Successfully retrieved all the genres.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Genre'
 *          400:
 *              description: Bad request. The request could not be understood or was missing required parameters.
 *          401:
 *              description: Unauthorized. Authentication is required or has failed.
 *          403:
 *              description: Forbidden. The user does not have permission to access this resource.
 *          404:
 *              description: Not found. No genres were found.
 *          500:
 *              description: Internal server error. An unexpected error occurred on the server.
 */
router.get("/", genreController.getGenres);

/**
 * @swagger
 * /api/v1/genres/{id}:
 *  get:
 *      tags:
 *          - genres
 *      summary: Get Genre by ID
 *      description: Returns a single Genre using their unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: ID of the Genre
 *      responses:
 *        200:
 *          description: Successfully retrieved the genre.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Genre'
 *        400:
 *          description: Bad request. Invalid ID format.
 *        404:
 *          description: Genre not found.
 *        500:
 *          description: Internal server error.
 */
// getting a specific genre
router.get("/:id", validateObjectIds, genreController.getGenre);


/**
 * @swagger
 * /api/v1/genres:
 *  post:
 *      tags:
 *        - genres
 *      summary: Create a new Genre
 *      description: Adds a new genre entry to the database
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Genre'
 *      responses:
 *        201:
 *          description: Created - Added new genre
 *        400:
 *          description: Bad Request - Validation or input error
 *        401:
 *          description: Unauthorized - No valid auth token
 *        403:
 *          description: Forbidden - Access Denied
 *        409:
 *          description: Conflict - Genre already exists
 *        500:
 *          description: Internal Server Error - Something went wrong
 */
// adding a new genre
router.post("/", validate(vd_genres), genreController.addGenre);


/**
 * @swagger
 * /api/v1/genres/{id}:
 *  put:
 *    tags:
 *        - genres
 *    summary: Update an existing Genre
 *    description: Fetch and update a Genre based on their unique ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of Genre
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Genre'
 *    responses:
 *      200:
 *        description: OK - Genre updated Successfully
 *      400:
 *        description: Bad Request - Validation or input error
 *      401:
 *        description: Unauthorized - No valid auth token
 *      403:
 *        description: Forbidden - Access Denied
 *      404:
 *        description: Not Found - recource with the given ID not found
 *      500:
 *        description: Internal Server Error - Something went wrong
 */
router.put(
  "/:id",
  [validateObjectIds, validate(vd_genres)],
  genreController.updateGenre
); // updating an existing genre

/**
 * @swagger
 * /api/v1/genres/{id}:
 *  delete:
 *      tags:
 *          - genres
 *      summary: Delete existing genre
 *      description: Remove genre based on their unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the Genre
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: OK - Genre Deleted Successfully
 *        400:
 *          description: Bad Request - Validation or input error
 *        401:
 *          description: Unauthorized - No valid auth token
 *        403:
 *          description: Forbidden - Access Denied
 *        404:
 *          description: Not Found - Genre with the given ID not found
 *        500:
 *          description: Internal Server Error - Something went wrong
 */
router.delete("/:id", [admin, validateObjectIds] , genreController.deleteGenre);  // deleting a genre

module.exports = router;
