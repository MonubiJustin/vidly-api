const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const validateObjectIds = require("../middleware/validateObjectIds");
const genreController = require("../controllers/genreController");
const { vd_genres } = require('../validators/genreValidator')
const validate = require('../middleware/validater')

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// getting all the genres
router.get("/", genreController.getGenres);

// getting a specific genre
router.get("/:id", validateObjectIds, genreController.getGenre);

// adding a new genre
router.post("/", validate(vd_genres), genreController.addGenre);

// updating an existing genre
router.put("/:id", [validateObjectIds, validate(vd_genres)], genreController.updateGenre);

// deleting a genre
router.delete("/:id", [admin, validateObjectIds], genreController.deleteGenre);

module.exports = router;
