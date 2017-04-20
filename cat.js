'use strict';

const cat = require('catlistener');

cat.server({
  node: 'supervisor',
  app: 'app'
});

cat.browserify({
  original: ['./static/js/script.js', './static/js/edit.js'],
  compilado: ['./static/js/subida.js','./static/js/editar.js'],
  presets: 'es2015'
});
