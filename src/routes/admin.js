const { Router } = require('express');
const router = Router();
const {unlink} = require('fs-extra');
const path = require('path');


const Producto = require('../models/Producto');
const Animal = require('../models/Animal');



//PAGINA-ADMINISTRADOR--(ANIMALES-&-PREVENTAS)
router.get('/admin', (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect('/login')
}, async(req, res) => {
  const productos = await Producto.find();
  const animales = await Animal.find();
  res.render('admin/admin', {productos, animales});
});



//SUBIR-ANIMAL--------------------//
router.get('/subir_animal', (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect('/login')
}, (req, res) => {
  res.render('admin/subir_animal')
});

//SUBIR-PRODUCTO--------------------//
router.get('/subir_producto', (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect('/login')
}, (req, res) => {
  res.render('admin/subir_producto')
});



//PROCESO-DE-SUBIDA/ANIMAL-------------------//
router.post('/subir_animal', async(req, res) => {
  const animal = new Animal();
  animal.nombre =req.body.nombre;
  animal.descripcion =req.body.descripcion;
  animal.fases =req.body.fases;
  animal.precio =req.body.precio;
  animal.sexo =req.body.sexo;
  animal.edad =req.body.edad;
  animal.seccion =req.body.seccion;
  animal.subseccion =req.body.subseccion;

  animal.filename =req.file.filename;
  animal.path = '/img/uploads/' + req.file.filename;
  animal.originalname =req.file.originalname;
  animal.mimetype =req.file.mimetype;
  animal.size =req.file.size;

  await animal.save();
  res.redirect('/admin');
});

//PROCESO-DE-SUBIDA/PRODUCTO--------------------//
router.post('/subir_producto', async(req, res) => {
  const producto = new Producto();
  producto.nombre = req.body.nombre;
  producto.descripcion = req.body.descripcion;
  producto.seccion = req.body.seccion;
  producto.precio = req.body.precio;

  producto.filename = req.file.filename;
  producto.path = '/img/uploads/' + req.file.filename;
  producto.originalname = req.file.originalname;
  producto.mimetype = req.file.mimetype;
  producto.size = req.file.size;

  await producto.save();
  res.redirect('/admin');
});



//ELIMINAR-ANIMAL--------------------//
router.get('/animal/:id/eliminar', async(req, res) => {
  const {id} = req.params;
  const animal = await Animal.findByIdAndDelete(id);
  await unlink(path.resolve('./src/public' + animal.path));
  res.redirect('/admin');
});

//ELIMINAR-PREVENTA--------------------//
router.get('/producto/:id/eliminar', async(req, res) => {
  const {id} = req.params;
  const producto = await Producto.findByIdAndDelete(id);
  await unlink(path.resolve('./src/public' + producto.path));
  res.redirect('/admin');
});

module.exports = router;



//ESTA-FUNCION-PERMITE-ENTRAR-A-LAS-DIRECCIONES-SOLO-SI-HAZ-INICIADO-SESION//
/* (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect('/login')
} */