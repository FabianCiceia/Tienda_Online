const jwt = require("jsonwebtoken");


// Obtén el secreto JWT del archivo .env
const secret = process.env.JWT_SECRET;

module.exports.whitelist = (req, res, next) => {
    // console.log(req);
    if ((getRoleFromToken(req.cookies.usertoken,secret)) === 'admin') {
        next();
    } else {
        res.status(403).json({ verified: false, msg: "No es un admin" });
    }
}


function getRoleFromToken(token, secret) {
    try {
        const decodedToken = jwt.verify(token, secret);
        const role = decodedToken.role;
        return role;
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return null;
    }
}