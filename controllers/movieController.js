const Movie = require("../model/movie");
const asyncMiddleware = require("../middleware/async");
const { Genre } = require("../model/genre");

//desc Getting all movies
//route GET /api/v1/movies
//access private
exports.getMovies = asyncMiddleware(async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({ msg: movies });
});

//desc Getting a single specific movie
//route GET /api/v1/movies/:id
//access private
exports.getMovie = asyncMiddleware(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res
      .status(404)
      .json({ msg: "Movie with the given id does not exist" });
  res.status(200).json({ msg: movie });
});

//desc Adding a new movie
//route POST /api/v1/movies
//access private
exports.addMovie = asyncMiddleware(async (req, res) => {
  const genre = await Genre.findById(req.body.genreid);
  if (!genre)
    return res
      .status(404)
            .json({ msg: "Genre with the given id was not found." });

    let movie = await Movie.findOne({ title: req.body.title });
    if (movie) return res.status(409).json({msg: "Movie already exists"})

  movie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
  });

  await movie.save();
  res.status(201).json({ msg: "Movie created successfully", movie: movie });
});

//desc Updating a movie
//route PUT /api/v1/movies/:id
//access private
exports.updateMovie = asyncMiddleware(async (req, res) => {
  const genre = await Genre.findById(req.body.genreid);
  if (!genre)
    return res
      .status(404)
      .json({ msg: "Genre with the given id does not exist" });

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
    return res
      .status(404)
      .json({ msg: "The movie with the given ID was not found." });
  res.status(200).json({ msg: "Movie updates successfully", movie: movie });
});


//desc Deleting a movie
//route DELETE /api/v1/movies/:id
//access private
exports.deleteMovie = asyncMiddleware(async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.send("Movie with the given id does not exist");
    res.status(200).json({ msg: "Movie deleted successfully", movie: movie });
  })