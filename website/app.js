const express = require("express");
const app = express();
const path = require('path');
const homeRoutes = require("./routes/home");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const productRoutes = require("./routes/products");
const shopCartRoutes = require("./routes/shopCart");
const aboutUsRoutes = require("./routes/aboutUs");
const session = require('express-session');
const cookieParser = require('cookie-parser');

//Setting template engine
app.set('view engine', 'ejs');

// Setear la carpeta public para archivos estaticos
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'piratas en el mapa' }));
app.use(cookieParser());

app.listen('3000', () => console.log('Servidor ejecutando en puerto 3000'));

app.use("/", homeRoutes);
app.use("/quienes-somos", aboutUsRoutes)
app.use("/login", loginRoutes);
app.use("/registro", registerRoutes);
app.use("/producto", productRoutes);
app.use("/carrito", shopCartRoutes)
