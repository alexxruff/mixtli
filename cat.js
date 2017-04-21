'use strict';

const cat = require('catlistener');

cat.server({
  node: 'supervisor',
  app: 'app'
});

cat.browserify({
  original: ['./static/js/script.js', './static/js/edit.js', './static/js/contact.js'],
  compilado: ['./static/js/subida.js','./static/js/editar.js', './static/js/contacto.js'],
  common: './static/js/global.js',
  presets: ['es2015']
});

cat.stylus({
  options: ['compila', 'escucha', 'observa'],
  css: './static/css/',
  stylus: './static/stylus/subida.styl'
});
