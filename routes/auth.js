const express = require("express");
const router = express.Router();
const { User, auth_validate } = require("../model/users");
const bcrypt = require('bcrypt');
const asyncMiddleware = require('../middleware/async')

router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = auth_validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).send("Invalid email or password");
    }

    res.send(user.genAuthToken());
}));

module.exports = router;
