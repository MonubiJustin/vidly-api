const express = require("express");
const router = express.Router();
const { vd_customers } = require("../validators/customerValidator");
const customerController = require('../controllers/customerController')
const validateObjectID = require('../middleware/validateObjectIds')
const validate = require('../middleware/validater')

// getting all the customers
router.get( "/", customerController.getCutomers);

// getting a specific customer
router.get("/:id", validateObjectID, customerController.getCustomer);

// adding a new customer
router.post("/", validate(vd_customers), customerController.addCustomer);

// updating an existing customer
router.put("/:id", validate(vd_customers), customerController.updateCustomer);

// deleting an existing customer
router.delete("/:id", validateObjectID, customerController.deleteCustomer);

module.exports = router;
