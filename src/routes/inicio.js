const { Router } = require('express');
const router = Router()

const Animal = require('../models/Animal');

//INICIO-PAGINA-PRINCIPAL
router.get('/', async(req, res) => {
  const animales = await Animal.find();
  res.render('index', {animales});
});


module.exports = router;