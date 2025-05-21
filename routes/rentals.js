const express = require("express");
const router = express.Router();
const { Rental, vd } = require("../model/rental");
const Customer = require("../model/customer");
const { Movie } = require("../model/movie");
// const asyncMiddleware = require('../middleware/async'); // Commented out

// creating a rental
router.post(
  "/",
  // asyncMiddleware( // Commented out
  async (req, res) => {
    const { error } = vd(req.body);
    if (error) return res.send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.send("Movie with the given id does not exist");

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.send("Customer with the given id does not exist");

    if (movie.numberInStock === 0) return res.send("Movie not in stock");

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

    res.send(rental);
  }
  // ) // Commented out
);

module.exports = router;
