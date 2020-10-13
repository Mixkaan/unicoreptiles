const {Schema, model} = require('mongoose');

const preventaSchema = new Schema({
    nombre: {type: String},
    descripcion: {type: String},
    precio: {type: Number},
    seccion: {type: String},

    filename: {type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: {type: Number},
    created_at: {type: Date, default: Date.now()},
})

module.exports = model('Preventa', preventaSchema);