const { Router } = require('express');
const router = Router()

const Animal = require('../models/Animal');

//TODOS-DISPONIBLES
router.get('/disponible', async(req, res) => {
  const animales = await Animal.find();
  res.render('disponible/disponible', {animales});
});


//DISPONIBLES-LAGARTOS
router.get('/disponible/lagartos', async(req, res) => {
  const animales = await Animal.find({seccion:"lagartos"});
  res.render('disponible/lagartos', {animales});
});


//-----DISPONIBLES-SERPIENTES
router.get('/disponible/serpientes', async(req, res) => {
  const animales = await Animal.find({seccion:"serpientes"});
  res.render('disponible/serpientes', {animales});
});


//DISPONIBLES-TORTUGAS
router.get('/disponible/tortugas', async(req, res) => {
  const animales = await Animal.find({seccion:"tortugas"});
  res.render('disponible/tortugas', {animales});
});



//SELECIONAR-ANIMAL-&-REDIRECIONAR-A-MAS-INFORMACION
router.get('/info_animal/:id', async(req, res) => {
  const {id} = req.params;
  const animal = await Animal.findById(id);
  res.render('disponible/animal-info', {animal});
});

module.exports = router;