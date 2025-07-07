const Customer = require("../model/customer");
const asyncMiddleware = require("../middleware/async");

//desc Getting all customers
//route GET /api/v1/customers
//access private
exports.getCutomers = asyncMiddleware(async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.status(200).json({ msg: customers });
});

//desc Getting a specific customer
//route GET /api/v1/customers/:id
//access private
exports.getCustomer = asyncMiddleware(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .json({ msg: "Customer with the given id was not found" });

  res.status(200).json({ msg: customer });
});

//desc Adding a new customer
//route POST /api/v1/customers
//access private
exports.addCustomer = asyncMiddleware(async (req, res) => {
  let customer = await Customer.findOne({ phone: req.body.phone });
  if (customer) return res.status(409).json({ msg: "customer already exists" });

  customer = new Customer(req.body);

  await customer.save();
  res
    .status(201)
    .json({ msg: "Customer created successfully", customer: customer });
});

//desc Updating a customer
//route PUT /api/v1/customers/:id
//access private
exports.updateCustomer = asyncMiddleware(async (req, res) => {
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

  if (!customer)
    return res
      .status(404)
      .json({ msg: "Customer with the given id was not found" });

  res.status(200).json({ msg: "Update was successful", customer: customer });
});

//desc Deleting a customer
//route DELETE /api/v1/customers/:_id
//access private
exports.deleteCustomer = asyncMiddleware(async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer)
    return res
      .status(404)
      .json({ msg: "Customer with the given id was not found" });

  res
    .status(200)
    .json({ msg: "Customer deleted successfully", deleted_customer: customer });
});
