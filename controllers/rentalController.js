const Rental = require("../model/rental");
const asyncMiddleware = require("../middleware/async");
const Movie = require('../model/movie')
const Customer = require('../model/customer')

//desc creating a rental
//route POST /api/v1/rentals
//access private
exports.addRental = asyncMiddleware(async (req, res) => {
  const movie = await Movie.findById(req.body.movieId);
  if (!movie)
    return res
      .status(404)
      .json({ msg: "Movie with the given id does not exist" });

  const customer = await Customer.findById(req.body.customerId);
  if (!customer)
    return res
      .status(404)
      .json({ msg: "Customer with the given id does not exist" });

  if (movie.numberInStock === 0)
    return res.status(400).json({ msg: "Movie not in stock" });

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  await rental.save();
  movie.numberInStock--;
  await movie.save();

  res.status(201).json({msg: "Rental created successfully", rental: rental});
});
