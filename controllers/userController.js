const { User, log_validate, reg_validate } = require('../model/users');
const asyncMiddleware = require('../middleware/async')

//@desc Register new User
//@route POST /api/v1/users/register
//@access public
exports.registerUser = asyncMiddleware(async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).json({ msg: "User already exists" });

    user = new User(req.body);
    await user.save();

    const token = user.genAuthToken()
    res.header('x-auth-token', token).status(201).json({msg: "User created successfully"})
})

//@desc Log in user
//@route POST /api/v1/users/login
//@access public
exports.loginUser = asyncMiddleware(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !user.isPasswdValid(req.body.password)) return res.status(401).json({ msg: "Invalid email or password" });
    const token = user.genAuthToken();
    res.status(200).json({ msg: "User logged in successfully", tkn: token });
})

//@desc Get current logged in user
//@route /api/v1/users/me
//@access private
exports.me = (req, res) => {
    res.status(200).json(`Welcome ${req.user.name}`)
}