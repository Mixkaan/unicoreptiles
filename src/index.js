const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const bodyParser = require('body-parser');

const { v4: uuidv4 } = require('uuid');
uuidv4();

const session = reuire('express-session');

//INICIALIZACION
const app = express();
require('./database');

//CONFIGS
app.set('port', process.env.PORT || 7000);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');



//SASS-MIDDLEWARE
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public/sass'),
  dest: path.join(__dirname, 'public/styles'),
  outputStyle: 'compressed',
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
  debug: false,
  prefix: '/styles',
}));

//MIDDLEWARES
app.use(session({
  secret: 'unico-reptiles-app',
  resave: true,
  saveUnitialized: true
}));

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
const storage = multer.diskStorage({
  destination: path.join(__dirname,'public/img/uploads'),
  filename: (req, file, cb, filename) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});
app.use(multer({
  storage
}).single('imagen'));

app.use(bodyParser.json());

//RUTAS
app.use(require('./routes/inicio'));
app.use(require('./routes/media'));
app.use(require('./routes/disponibles'));
app.use(require('./routes/productos'));
app.use(require('./routes/contactanos'));

app.use(require('./routes/compra'));

app.use(require('./routes/login'));
app.use(require('./routes/admin'));

//ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, 'public')));

//INICIAR EL SERVIDOR
app.listen(app.get('port'), () => {
  console.log('Servidor iniciado en el Puerto', app.get('port'));
});