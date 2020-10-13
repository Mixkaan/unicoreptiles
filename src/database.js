//-----BASE-DE-DATOS-PRODUCCION-----//
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://unicoreptiles:Elizabeth123@cluster0.okzuz.mongodb.net/Cluster0?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//-----BASE-DE-DATOS-DESARROLLO-----//
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/unico', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

//   .then(db => console.log('Base de datos conectada'))
//   .catch(err => console.log(err));