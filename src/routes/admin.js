const express = require('express'); 
const router = express.Router();
const db = require('../models/db');

router.get('/login', (req, res) => res.render('login', { error: null }));

router.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  db.query('SELECT * FROM admin WHERE usuario = ? AND password = ?', [usuario, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      req.session.admin = true;
      res.redirect('/admin');
    } else {
      res.render('login', { error: 'Credenciales incorrectas' });
    }
  });
});

router.get('/editar/:id', (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/login');
  db.query('SELECT * FROM productos WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.redirect('/admin');
    res.render('editar', { producto: results[0] });
  });
});

// Actualizar producto
router.post('/editar/:id', (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/login');
  const { nombre, descripcion, precio, talla } = req.body;
  db.query(
    'UPDATE productos SET nombre=?, descripcion=?, precio=?, talla=? WHERE id=?',
    [nombre, descripcion, precio, talla, req.params.id],
    (err) => {
      if (err) throw err;
      res.redirect('/admin');
    }
  );
});


router.get('/', (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/login');
  db.query('SELECT * FROM productos', (err, productos) => {
    if (err) throw err;
    res.render('dashboard', { productos, admin: true });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

module.exports = router;
