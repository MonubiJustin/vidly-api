const express = require("express");
const router = express.Router();
const rentalController = require('../controllers/rentalController')
const validate = require('../middleware/validater');
const {vd_rental} = require('../validators/rentalValidator')

// creating a rental
router.post("/", validate(vd_rental), rentalController.addRental);

module.exports = router;
