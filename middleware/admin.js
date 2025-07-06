module.exports = function (req, res, next) {
    console.log(req.user.isAdmin)
    if (!req.user.isAdmin) return res.status(403).json({msg: "Access Denied"})

    next();
}