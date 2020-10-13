const {Schema, model} = require('mongoose');

const animalSchema = new Schema({
    nombre: {type: String},
    descripcion: {type: String},
    fases: {type: String},
    precio: {type: Number},
    sexo: {type: String},
    edad: {type: String},
    seccion: {type: String},

    filename: {type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: {type: Number},
    created_at: {type: Date, default: Date.now()},
})

module.exports = model('Animal', animalSchema);