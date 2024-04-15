const jwt = require("jsonwebtoken");
const list = process.env.JWT_LIST;
module.exports.secret = process.env.JWT_SECRET;

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken,  process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false, msg: "El token no es válido!" });
        } else {
            next();
        }
    });
}