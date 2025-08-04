const express = require('express');
const router = express.Router();
const { listarProductos, crearProducto, eliminarProducto, editarProducto } = require('../controllers/productoController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.get('/productos', listarProductos);
router.post('/productos', upload.single('imagen'), crearProducto);
router.post('/productos/:id/delete', eliminarProducto);
router.post('/productos/:id/edit', upload.single('imagen'), editarProducto);
router.get('/', (req, res) => {
  res.render('productos'); // Esto buscará productos.ejs en /views
});

module.exports = router;
