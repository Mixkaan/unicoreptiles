const { Router } = require('express');
const router = Router()
const {unlink} = require('fs-extra');
const path = require('path');

const Producto = require('../models/Producto');
const Animal = require('../models/Animal');

const Stripe = require('Stripe')

//STRIPE
const stripe = require('stripe')('sk_test_fu8TvMKyKO8k1PPajqhOezsV00bgGfrfC5');


router.get('/compra', async(req, res) => {
  res.render('compra/compra');
});

router.post('/collect_details', async (request, response) => {
  try {
    const intent = await stripe.paymentIntents.create({
      amount: 3099,
      currency: 'mxn',
      payment_method: request.body.payment_method_id,
      payment_method_options: {
        card: {
          installments: {
            enabled: true,
          },
        },
      },
    });

    // We could confirm without installments if no plans are available,
    // but let's give the user the chance to pick a different card
    // if installments are not available.
    return response.send({
      intent_id: intent.id,
      available_plans: intent.payment_method_options.card.installments.available_plans,
    });
  } catch (err) {
    // "err" contains a message explaining why the request failed
    return response.status(500).send({error: err.message});
  }
});





router.post('/confirm_payment', async (request, response) => {
  try {
    let confirmData = {};
    if (request.body.selected_plan !== undefined) {
      confirmData = {
        payment_method_options: {
          card: {
            installments: {
              plan: request.body.selected_plan,
            },
          },
        },
      };
    }

    const intent = await stripe.paymentIntents.confirm(
      request.body.payment_intent_id,
      confirmData,
    );

    return response.send({success: true, status: intent.status});
  } catch (err) {
    return response.status(500).send({error: err.message});
  }
});


// //PROCESO DE COMPRA DE UN PRODUCTO
// router.post('/compra/producto/:id', async(req, res) => {

//   const {id} = req.params;
//   const producto = await Producto.findById(id);

//   const customer = await stripe.customers.create({
//     email: req.body.stripeEmail,
//     source: req.body.stripeToken
//   });
//   const charge = await stripe.charges.create({
//     amount: producto.precio*100,
//     currency: 'mxn',
//     customer: customer.id,
//     description: producto.descripcion
//   })
//   console.log(charge.id)
//   res.redirect('/producto/hecho/'+producto.id);
// });

// //PROCESO DE COMPRA DE UN ANIMAL
// router.post('/compra/animal/:id', async(req, res) => {

//   const {id} = req.params;
//   const animal = await Animal.findById(id);

//   const customer = await stripe.customers.create({
//     email: req.body.stripeEmail,
//     source: req.body.stripeToken
//   });
//   const charge = await stripe.charges.create({
//     amount: animal.precio*100,
//     currency: 'mxn',
//     customer: customer.id,
//     description: animal.descripcion
//   })
//   console.log(charge.id)
//   res.redirect('/animal/hecho/'+animal.id);
// });



// // FINALIZAR COMPRA -------------------- //
// router.get('/producto/hecho/:id', async(req, res) => {
//   const {id} = req.params;
//   const producto = await Producto.findByIdAndDelete(id);
//   await unlink(path.resolve('./src/public' + producto.path));
//   res.render('compra/hecho');
// });

// router.get('/animal/hecho/:id', async(req, res) => {
//   const {id} = req.params;
//   const animal = await Animal.findByIdAndDelete(id);
//   await unlink(path.resolve('./src/public' + animal.path));
//   res.render('compra/hecho');
// });

module.exports = router;