const { Movie, validate } = require("../model/movie");
const { Genre } = require("../model/genre");
const express = require("express");
const asyncMiddleware = require("../middleware/async");
const router = express.Router();
const validater = require('../middleware/validater')

// getting all the movies
router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
  })
);

// getting a specific movie
router.get( "/:id", asyncMiddleware(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.send("Movie with the given id does not exist");
    res.send(movie);
  })
);

// creating a new movie object
router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreid);
    if (!genre) return res.send("Genre with the given id was not found.");

    const movie = new Movie({
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
    });

    await movie.save();
    res.json({ message: "Movie created successfully", movie: movie });
  })
);

// deleting a movie
router.delete(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.send("Movie with the given id does not exist");
    res.json({ message: "Movie deleted successfully", movie: movie });
  })
);

// updating a movie
router.put(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreid);
    if (!genre) return res.send("Genre with the given id does not exist");

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
          _id: genre._id,
          name: genre.name,
        },
      },
      { new: true }
    );

    if (!movie)
      return res.status(404).send("The movie with the given ID was not found.");
    res.send(movie);
  })
);

module.exports = router;
