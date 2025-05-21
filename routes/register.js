const express = require("express");
const router = express.Router();
const { User, validate } = require("../model/users");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require('../middleware/auth')

// getting a specific user
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user)
})

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.send("User already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  try {
    await user.save();
    const token = user.genAuthToken()
    res.header('x-auth-token', token).json({
      message: "User Created Successfully",
      user: _.pick(user, ["_id", "name", "email"]),
    });
  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = router;
