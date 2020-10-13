const { Router } = require('express');
const router = Router()
const {unlink} = require('fs-extra');
const path = require('path');

const Producto = require('../models/Producto');
const Animal = require('../models/Animal');

//STRIPE
const stripe = require('stripe')('sk_test_fu8TvMKyKO8k1PPajqhOezsV00bgGfrfC5');

//PROCESO DE COMPRA DE UN PRODUCTO
router.post('/compra/producto/:id', async(req, res) => {

  const {id} = req.params;
  const producto = await Producto.findById(id);

  const customer = await stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  });
  const charge = await stripe.charges.create({
    amount: producto.precio*100,
    currency: 'mxn',
    customer: customer.id,
    description: producto.descripcion
  })
  console.log(charge.id)
  res.redirect('/animal/hecho/'+producto.id);
});

//PROCESO DE COMPRA DE UN ANIMAL
router.post('/compra/animal/:id', async(req, res) => {

  const {id} = req.params;
  const animal = await Animal.findById(id);

  const customer = await stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  });
  const charge = await stripe.charges.create({
    amount: animal.precio*100,
    currency: 'mxn',
    customer: customer.id,
    description: animal.descripcion
  })
  console.log(charge.id)
  res.redirect('/animal/hecho/'+animal.id);
});



// FINALIZAR COMPRA -------------------- //
router.get('/producto/hecho/:id', async(req, res) => {
  const {id} = req.params;
  const producto = await Producto.findByIdAndDelete(id);
  await unlink(path.resolve('./src/public' + producto.path));
  res.render('compra/hecho');
});

router.get('/animal/hecho/:id', async(req, res) => {
  const {id} = req.params;
  const animal = await Animal.findByIdAndDelete(id);
  await unlink(path.resolve('./src/public' + animal.path));
  res.render('compra/hecho');
});

module.exports = router;