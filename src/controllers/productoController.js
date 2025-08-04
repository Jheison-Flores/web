const db = require('../models/db');

exports.listarProductos = (req, res) => {
  db.query('SELECT * FROM productos', (err, resultados) => {
    if (err) throw err;
    res.json(resultados);
  });
};

exports.crearProducto = (req, res) => {
  const { nombre, descripcion, precio_original, precio, talla } = req.body;
  const descuento = req.body.descuento ? 1 : 0;
  const imagen = req.file ? req.file.filename : null;

  db.query(
    'INSERT INTO productos (nombre, descripcion, precio_original, precio, talla, imagen, descuento) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nombre, descripcion, precio_original, precio, talla, imagen, descuento],
    err => {
      if (err) throw err;
      res.redirect('/admin');
    }
  );
};

exports.eliminarProducto = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM productos WHERE id = ?', [id], err => {
    if (err) throw err;
    res.redirect('/admin');
  });
};

exports.editarProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio_original, precio, talla } = req.body;
  const descuento = req.body.descuento ? 1 : 0;
  const imagen = req.file ? req.file.filename : null;

  const query = imagen
    ? 'UPDATE productos SET nombre=?, descripcion=?, precio_original=?, precio=?, talla=?, imagen=?, descuento=? WHERE id=?'
    : 'UPDATE productos SET nombre=?, descripcion=?, precio_original=?, precio=?, talla=?, descuento=? WHERE id=?';

  const params = imagen
    ? [nombre, descripcion, precio_original, precio, talla, imagen, descuento, id]
    : [nombre, descripcion, precio_original, precio, talla, descuento, id];

  db.query(query, params, err => {
    if (err) throw err;
    res.redirect('/admin');
  });
};
