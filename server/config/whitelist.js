const jwt = require("jsonwebtoken");

// Obtén la lista de correos electrónicos permitidos del archivo .env y conviértelos en un array
const list = process.env.WHITELISTED_EMAILS.split(',');

// Obtén el secreto JWT del archivo .env
const secret = process.env.JWT_SECRET;

module.exports.whitelist = (req, res, next) => {
    if (list.includes(getEmailFromToken(req.cookies.usertoken,secret))) {
        console.log("correo valido para guardar datos");
        next();
    } else {
        // Si el correo electrónico del usuario no está en la lista blanca, devuelve un error de autorización
        res.status(403).json({ verified: false, msg: "Correo electrónico no autorizado para hacer peticiones" });
    }
}


// Función para verificar y decodificar el token JWT
function getEmailFromToken(token, secret) {
    try {
        // Verificar y decodificar el token utilizando el secreto
        const decodedToken = jwt.verify(token, secret);
        // Extraer el email del payload del token
        const email = decodedToken.email;
        return email;
    } catch (error) {
        // Manejar cualquier error que ocurra durante la verificación del token
        console.error("Error al verificar el token:", error);
        return null;
    }
}