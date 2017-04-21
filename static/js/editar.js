require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({4:[function(require,module,exports){
'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'multipart/form-data'
});

function editar(e) {
  var formData = new FormData(document.querySelector('#cursos'));
  document.querySelector('#cargando').innerHTML = 'Actualizando curso... espere un momento';
  e.preventDefault();

  fetch('/editar', {
    method: 'PUT',
    credentials: 'same-origin',
    body: formData
  }).then(function (data) {
    return data.json();
  }).then(function (data) {
    var cargando = document.querySelector('#cargando');
    cargando.innerHTML = "Actualizando el curso";
    obteniendo();
    setTimeout(function () {
      cargando.innerHTML = '';
    }, 2000);
  }).catch(function (err) {
    console.log(err);
  });
}

document.querySelector('#cursos').addEventListener('submit', editar);

function obteniendo(e) {
  fetch('/editando/' + document.querySelector('#id').value).then(function (data) {
    return data.json();
  }).then(function (c) {
    var cursos = document.querySelector('#cursos-obt');
    cursos.innerHTML = '';
    var img = document.createElement('img');
    img.className = "imagen-curso";
    img.src = '/imagenes/' + c.info.imagen;
    var contenedor = document.createElement('div');
    contenedor.className = 'cursos-datos';
    contenedor.innerHTML = '\n    <p class="titulo">' + c.info.titulo + '</p>\n    <p class="informacion">' + c.info.informacion + '</p>\n    <p class="fecha">Fecha del curso ' + (0, _moment2.default)(c.info.fecha).add(1, 'days').format('YYYY-MM-DD') + '</p>\n    <p class="costo">Precio $' + c.info.costo + '</p>\n    ';
    contenedor.appendChild(img);
    cursos.appendChild(contenedor);
  }).catch(function (err) {
    console.log(err);
  });
}

obteniendo();

},{"moment":1}]},{},[4]);
