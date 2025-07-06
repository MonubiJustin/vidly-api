const { Genre } = require("../model/genre");
const asyncMiddleware = require("../middleware/async");

//desc Getting all genres
//route GET /api/v1/genres
//access private
exports.getGenres = asyncMiddleware(async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

//desc Getting a specific genre
//route GET /api/v1/genres/:id
//access private
exports.getGenre = asyncMiddleware(async (req, res) => {
  const genre = await Genre.findById(req.params.id).select("name -_id ");
  if (!genre)
    return res
      .status(404)
      .json({ msg: "Genre with the given id was not found" });
  res.status(200).json({ msg: "Genre available", genre: genre });
});

//desc creating a new Genre
//route POST /api/v1/genres
//access private
exports.addGenre = asyncMiddleware(async (req, res) => {
  let genre = await Genre.findOne({ name: req.body.name });
  if (genre) return res.status(409).json({ msg: "Genre already exists" });

  genre = new Genre({
    name: req.body.name,
  });

  await genre.save();
  res.status(200).json({ msg: "Genre created successfully", genre: genre });
});

//desc Updating a Genre
//route PUT /api/v1/genres/:id
//access private
exports.updateGenre = asyncMiddleware(async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
      },
    },
    { new: true }
  );

  if (!genre)
    return res
      .status(404)
      .json({ msg: "Genre with the given id was not found" });
  res.status(200).json({ msg: "Genre updated successfully", genre: genre });
});

//desc deleting a genre
//route DELETE /api/v1/genres/:id
//access private
exports.deleteGenre = asyncMiddleware(async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res
      .status(404)
      .json({ msg: "Genre with the given id was not found" });

  res
    .status(200)
    .json({ msg: "Genre Deletion Successful", deletedGenre: genre });
});
