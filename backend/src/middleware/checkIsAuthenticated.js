require("dotenv-safe").config();
const Jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    Jwt.verify(authorization.split(" ")[1], process.env.SECRET, (err, decode) => {
        !err ? next() : res.json({isAuth: false});
    });
};