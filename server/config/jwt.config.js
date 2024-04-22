const jwt = require("jsonwebtoken");
const list = process.env.JWT_LIST;
module.exports.secret = process.env.JWT_SECRET;

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken,  process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false, msg: "El token no es válido!" });
        } else {
            // Si el token es válido, puedes obtener el ID del usuario desde el payload
            // console.log(payload);
            const userId = payload._id; // Suponiendo que el ID del usuario está almacenado en el payload del token como 'id'
            // Agrega el ID del usuario al objeto req para que esté disponible en la siguiente función
            req.userId = userId;
            next();
        }
    });
}