const { Router } = require('express');
const router = Router()
const {unlink} = require('fs-extra');
const path = require('path');

const Producto = require('../models/Producto');


//TODOS-DISPONIBLES
router.get('/productos', async(req, res) => {
  const alimentos = await Producto.find({seccion: "alimento"});
  const suplementos = await Producto.find({seccion: "suplemento"});
  const decoraciones = await Producto.find({seccion: "decoracion"});
  const mantenimientos = await Producto.find({seccion: "mantenimiento"});
  res.render('productos/productos', {
    alimentos,suplementos,decoraciones,mantenimientos});
});


router.get('/info_producto/:id', async(req, res) => {
  const {id} = req.params;
  const producto = await Producto.findById(id);
  res.render('productos/info_producto', {producto});
});



module.exports = router;