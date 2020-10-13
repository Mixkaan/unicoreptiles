const { Router, request } = require('express');
const router = Router()

const nodemailer = require('nodemailer');

//CONTACTANOS
router.get('/contactanos', (req, res) => {
  res.render('contactanos/contactanos', {succes: ''})
});

router.post('/enviar_email', async (req, res) => {
  const {nombre, email, telefono, mensaje} = req.body;
  contentHTML = `
    <h1>Informacion de usuario</h1>
    <ul>
      <li>usuario: ${nombre} </li>
      <li>email: ${email} </li>
      <li>celular:${telefono} </li>
    </ul>
    <h2> Mensaje </h2>
    <p> ${mensaje} </p>
  `;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'unicoreptiles@gmail.com',
      pass: 'Pogona123'
    },
    tls: {
      rejectUnoauthorized: false
    }

  });
  const info = await transporter.sendMail({
    from: 'usuario',
    to: 'unicoreptiles@gmail.com',
    subject: 'mensaje de pagina web',
    html: contentHTML
  });
  res.redirect('/contactanos/env');

});

router.get('/contactanos/env', (req, res) => {
  res.render('contactanos/contactanos', {succes:'Mensaje enviado'})
});

module.exports = router;