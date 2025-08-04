const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Devuelve los 5 productos en descuento más recientes
router.get('/productos-descuento', (req, res) => {
  db.query(
    'SELECT id, nombre, descripcion, imagen, precio, precio_original FROM productos WHERE descuento = 1 ORDER BY id DESC LIMIT 5',
    (err, results) => {
      if (err) return res.status(500).json([]);
      res.json(results);
    }
  );
});

module.exports = router;