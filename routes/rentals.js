const express = require("express");
const router = express.Router();
const rentalController = require('../controllers/rentalController')
const validate = require('../middleware/validater');
const {vd_rental} = require('../validators/rentalValidator')

/**
 * @swagger
 * /api/v1/rentals:
 *  post:
 *      tags:
 *          - rentals
 *      summary: Create a rental
 *      description: Create a rental to test the post method functionality
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RentalInput'
 *      responses:
 *          201:
 *              description: Created - Rental created Successfully
 *          400:
 *              description: Bad Request - Validation or input errors
 *          401:
 *              description: Unauthorized - No valid auth token provide
 *          500:
 *              description: Internal Server Error - Something went wrong
 */
router.post("/", validate(vd_rental), rentalController.addRental);  // creating a rental

module.exports = router;
