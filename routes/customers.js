const express = require("express");
const router = express.Router();
const { vd_customers } = require("../validators/customerValidator");
const customerController = require("../controllers/customerController");
const validateObjectID = require("../middleware/validateObjectIds");
const validate = require("../middleware/validater");

/**
 * @swagger
 * /api/v1/customers:
 *  get:
 *      tags:
 *          - customers
 *      summary: Retrieve all customers
 *      description: Returns all the customers to verify the GET method functionality.
 *      responses:
 *          200:
 *              description: Successfully retrieved all customers.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Customer'
 *          400:
 *              description: Bad request. The request could not be understood or was missing required parameters.
 *          401:
 *              description: Unauthorized. Authentication is required or has failed.
 *          403:
 *              description: Forbidden. Access Denied
 *          404:
 *              description: Not found. No customers were found.
 *          500:
 *              description: Internal server error. An unexpected error occurred on the server.
 *
 */
router.get("/", customerController.getCutomers);

/**
 * @swagger
 * /api/v1/customers/{id}:
 *  get:
 *      tags:
 *          - customers
 *      summary: Get customer by ID
 *      description: Fetch a single customer using their specific ID
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: ID of the Customer
 *      responses:
 *          200:
 *              description: OK - Successfully retrieved Customer
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Customer'
 *          400:
 *              description: Bad Request - Validation or input errors
 *          401:
 *              description: Unauthorized - No valid auth token
 *          403:
 *              description: Forbidden - Access denied
 *          404:
 *              description: Not Found - No resource with the given ID
 *          500:
 *              description: Internal Server Error - Something went wrong
 */
// getting a specific customer
router.get("/:id", validateObjectID, customerController.getCustomer);

/**
 * @swagger
 * /api/v1/customers:
 *  post:
 *      tags:
 *          - customers
 *      summary: Create a new customer
 *      description: Creates a customer entry with name, phone and isGold information
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Customer'
 *      responses:
 *          201:
 *              description: Created - Customer created successfully
 *          400:
 *              description: Bad Request - Validation or Input errors
 *          401:
 *              description: Unauthorized - No valid auth token
 *          403:
 *              description: Forbidden - Access Denied
 *          409:
 *              description: Conflict - Customer already exists
 *          500:
 *              description: Internal Server Error - Something went wrong
 */
router.post("/", validate(vd_customers), customerController.addCustomer); // adding a new customer

/**
 * @swagger
 * /api/v1/customers/{id}:
 *  put:
 *      tags:
 *          - customers
 *      summary: Update Customer details
 *      description: Update either Customer name, phone, or isGold properties using their unique ID
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: ID of the customer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Customer'
 *      responses:
 *          200:
 *              description: OK - Customer updated successfully
 *          400:
 *              description: Bad Request - Validation or input error
 *          401:
 *              description: Unauthorized - No valid auth token
 *          403:
 *              description: Forbidden - Access Denied
 *          404:
 *              description: Not Found - No customer with the given ID
 *          500:
 *              description: Internal Server Error - Something went wrong
 */
router.put(
  "/:id",
  validateObjectID,
  validate(vd_customers),
  customerController.updateCustomer
); // updating an existing customer

/**
 * @swagger
 * /api/v1/customers/{id}:
 *  delete:
 *      tags:
 *          - customers
 *      summary: Delete existing Customer
 *      description: Removes an existing Customer based on their unique ID
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: ID of the customer
 *      responses:
 *          200:
 *              description: OK - Customer Deleted Successfully
 *          400:
 *              description: Bad Request - Validation or input error
 *          401:
 *              description: Unauthorized - No valid auth token
 *          403:
 *              description: Forbidden - Access Denied
 *          404:
 *              description: Not Found - Customer with the given ID doesn't exist
 *          500:
 *              description: Internal Server Error - Something went wrong
 */
router.delete("/:id", validateObjectID, customerController.deleteCustomer); // deleting an existing customer

module.exports = router;
