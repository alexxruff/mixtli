'use strict';

/*
  Modulo encargado de administrar los esquemas de la
  base de datos.
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const schema = mongoose.Schema;

const cursos = {
  titulo: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: false
  },
  informacion: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: false
  },
  costo: {
    type: Number,
    required: false
  }
}

const Esquema = {
  cursos: mongoose.model('cursos', cursos)
}

module.exports = Esquema;
