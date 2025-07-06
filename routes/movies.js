const express = require("express");
const router = express.Router();
const movieController = require('../controllers/movieController')
const validateObjectID = require('../middleware/validateObjectIds')
const validate = require('../middleware/validater')
const {vd_movie} = require('../validators/movieValidator')

// getting all the movies
router.get("/", movieController.getMovies);

// getting a specific movie
router.get( "/:id", validateObjectID, movieController.getMovie);

// creating a new movie object
router.post("/", validate(vd_movie), movieController.addMovie);

// updating a movie
router.put("/:id", validate(vd_movie), movieController.updateMovie);


// deleting a movie
router.delete("/:id", validateObjectID, movieController.deleteMovie);


module.exports = router;
