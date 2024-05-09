
const express = require("express");
const cors = require('cors');
const app = express();
const path = require("path"); // Importa el módulo 'path' de Node.js
const cookieParser = require('cookie-parser'); // to be able to read cookies
require('dotenv').config();
app.use(cookieParser());

const corsOptions = {
    credentials: true, // Allow credentials (cookies) to be sent to/from origin
    origin: ['http://localhost:5173','https://nljnbvkt-5173.brs.devtunnels.ms/'], // Allow only this origin
    methods: 'GET, POST, PUT, PATCH, DELETE', // Allow these methods
};

app.use(cors(corsOptions));

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

require("./config/mongoose.config");

const ProductRouter = require("./routes/product.routes");

app.use("/api/product", ProductRouter);

const UserRouter = require("./routes/user.routes");
app.use("/api/auth", UserRouter);
const CartRouter = require('./routes/cart.routes');
app.use("/api/cart",CartRouter);


app.listen(8000, () => console.log(`Listening on port: 8000`));