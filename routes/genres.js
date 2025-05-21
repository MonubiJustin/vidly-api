const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre } = require("../model/genre");
const { vd_genres } = require("../validation/validate");
const express = require("express");
const validateObjectIds = require('../middleware/validateObjectIds')
// const asyncMiddleware = require('../middleware/async'); // Commented out

const router = express.Router();

// getting all the genres
router.get(
  "/",
  // asyncMiddleware( // Commented out
  async (req, res) => {
      const genres = await Genre.find();
    res.send(genres);
  }
  // ) // Commented out
);

// getting a specific genre
router.get(
  "/:id",
  validateObjectIds,
  // asyncMiddleware( // Commented out
  async (req, res) => {
    

    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("Genre with the given id was not found");
    res.send(genre);
  }
  // ) // Commented out
);

// adding a new genre
router.post(
  "/",
  auth,
  // asyncMiddleware( // Commented out
  async (req, res) => {
    const { error } = vd_genres(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
      name: req.body.name,
    });

    await genre.save();
    res.send(genre);
  }
  // ) // Commented out
);

// updating an existing genre
router.put(
  "/:id",
  // asyncMiddleware( // Commented out
  async (req, res) => {
    const { error } = vd_genres(req.body);
    if (error) return res.send(error.details[0].message);

    const result = await Genre.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
        },
      },
      { new: true }
    );

    if (!result) return res.send("Genre with the given id was not found");
    res.send(result);
  }
  // ) // Commented out
);

// deleting a genre
router.delete(
  "/:id",
  [auth, admin],
  // asyncMiddleware( // Commented out
  async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.send("Genre with the given id was not found");
    res.send({ message: "Genre deleted successfully", genre: genre });
  }
  // ) // Commented out
);

module.exports = router;
