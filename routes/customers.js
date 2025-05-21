const express = require("express");
const router = express.Router();
const { vd_customers } = require("../validation/validate");
const Customer = require("../model/customer");
const asyncMiddleware = require("../middleware/async");

// getting all the customers
router.get( "/", asyncMiddleware(async (req, res) => {
    const customers = await Customer.find().sort("name");
    res.send(customers);
  })
);

// getting a specific customer
router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {const customer = await Customer.findById(req.params.id);
    if (!customer) return res.send("Customer with the given id was not found");

    res.send(customer);
  })
);

// adding a new customer
router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { error } = vd_customers(req.body);
    if (error) return res.send(error.details[0].message);

    const customer = new Customer({
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    });

    await customer.save();
    res.send(customer);
  })
);

// updating an existing customer
router.put(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const { error } = vd_customers(req.body);
    if (error) return res.send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          phone: req.body.phone,
        },
      },
      { new: true }
    );

    if (!customer) return res.send("Customer with the given id was not found");

    res.send({ message: "Update was successful", customer: customer });
  })
);

// deleting an existing customer
router.delete(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.send("Customer with the given id was not found");

    res.send({ message: "Delete was successful", customer: customer });
  })
);

module.exports = router;
