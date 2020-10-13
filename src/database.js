//-----BASE-DE-DATOS-PRODUCCION-----//
// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://unicoreptiles:Elizabeth123@cluster0.okzuz.mongodb.net/Cluster0?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
const mongoose = require('mongoose');
const URI = 'mongodb+srv://unicoreptiles:Elizabeth123@unicoreptiles.okzuz.mongodb.net/Elizabeth123?retryWrites=true&w=majority';
const connectDB = async () => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('conectred...');
}
module.exports = connectDB;

//-----BASE-DE-DATOS-DESARROLLO-----//
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/unico', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

//   .then(db => console.log('Base de datos conectada'))
//   .catch(err => console.log(err));