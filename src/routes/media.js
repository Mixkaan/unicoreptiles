const { Router } = require('express');
const router = Router()

//INICIO-PAGINA-PRINCIPAL
router.get('/media', (req, res) => {
  res.render('media/media')
});

//MORPH CALCULATOR
router.get('/morph-calculator', (req,res) => {
  res.render('media/morph-calculator')
});



module.exports = router;