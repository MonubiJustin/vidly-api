const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validater')
const {reg_validate, log_validate} = require('../validators/userValidator')


/**
 * @swagger
 * /api/v1/users/register:
 *  post:
 *      tags:
 *          - users
 *      summary: Create a new user
 *      description: Registers a new user to the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: Created - Added new User
 *          400:
 *              description: Unauthorized - No valid auth token
 *          403:
 *              description: Forbidden - Access Denied
 *          409:
 *              description: Conflict - User already exists
 *          500:
 *              dscription: Internal Server Error - Something went wrong
 */
router.post('/register',  validate(reg_validate), userController.registerUser) // register route

/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *      tags:
 *          - users
 *      summary: Authenticate user
 *      description: Logs in a user and returns a jwt token for authentication
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginRequest'
 *      responses:
 *          200:
 *              description: OK -  User logged in successfully
 *          400:
 *              description: Bad Request - Validation or input error
 *          401:
 *              description: Unauthorized - Invalid email or password
 *          500:
 *              description: Internal Server Error - Something went wrong
 */
router.post('/login',  validate(log_validate), userController.loginUser); // login route



router.get('/me',  auth, userController.me)  // User profile


module.exports = router