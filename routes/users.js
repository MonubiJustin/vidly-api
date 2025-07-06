const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validater')
const {reg_validate, log_validate} = require('../validators/userValidator')


// register route
router.post('/register',  validate(reg_validate), userController.registerUser)

// login route
router.post('/login',  validate(log_validate), userController.loginUser);

// current logged user
router.get('/me',  userController.me)


module.exports = router