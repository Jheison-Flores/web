const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'clave_secreta',
  resave: false,
  saveUninitialized: true
}));

// Motor de vistas
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Rutas
const productoRoutes = require('./src/routes/productos');
const adminRoutes = require('./src/routes/admin');
const apiRoutes = require('./src/routes/api');
app.use('/api', apiRoutes);
app.get('/productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'productos.html'));
});

app.use('/api', productoRoutes);
app.use('/admin', adminRoutes);
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
  res.send('¡Bienvenido a Tienda de Ropa!');
});


app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
