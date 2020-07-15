const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const rememberUserMiddleware = require("./middlewares/rememberUserMiddleware");

//Setting template engine
app.set('view engine', 'ejs');

// Setear la carpeta public para archivos estaticos
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'piratas en el mapa' }));
app.use(cookieParser());

app.listen('3000', () => console.log('Servidor ejecutando en puerto 3000'));

// Web Routes
const homeRoutes = require("./routes/home");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const logoutRoutes = require("./routes/logout")
const productRoutes = require("./routes/products");
const shopCartRoutes = require("./routes/shopCart");
const aboutUsRoutes = require("./routes/aboutUs");
const categoriesRouter = require("./routes/categories");

app.use(rememberUserMiddleware);
app.use("/", homeRoutes);
app.use("/quienes-somos", aboutUsRoutes)
app.use("/login", loginRoutes);
app.use("/registro", registerRoutes);
app.use("/logout", logoutRoutes);
app.use("/productos", productRoutes);
app.use("/carrito", shopCartRoutes);
app.use("/categorias", categoriesRouter);
