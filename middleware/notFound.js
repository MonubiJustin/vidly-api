module.exports = (req, res, next) => {
    res.status(404).json("Route Not Found")
}