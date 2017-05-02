require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({5:[function(require,module,exports){
'use strict';

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

function subida(e) {
  var formData = new FormData(document.querySelector('#cursos'));
  document.querySelector('#cargando').innerHTML = 'Creando curso... espere un momento';
  e.preventDefault();

  fetch('/subir-archivos', {
    method: 'POST',
    credentials: 'same-origin',
    body: formData
  }).then(function (data) {
    return data.json();
  }).then(function (data) {

    var cargando = document.querySelector('#cargando');
    cargando.innerHTML = "El curso se ha creado.";
    obteniendo();
    setTimeout(function () {
      cargando.innerHTML = '';
    }, 2000);
  }).catch(function (err) {
    console.log(err);
  });
}

document.querySelector('#cursos').addEventListener('submit', subida);

function eliminar(e) {

  fetch('/eliminar', {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: myHeaders,
    body: JSON.stringify({
      id: e.toElement.attributes['eliminar'].nodeValue
    })
  }).then(function (res) {
    return res.json();
  }).then(function (res) {
    obteniendo();
  }).catch(function (err) {
    console.log(err);
  });
}

function obteniendo(e) {
  fetch('/obtener/' + 10).then(function (data) {
    return data.json();
  }).then(function (data) {
    var cursos = document.querySelector('#cursos-obt');
    cursos.innerHTML = '';
    data.cursos.map(function (c) {
      var id = (0, _uid2.default)(25);
      var img = document.createElement('img');
      img.className = "imagen-curso";
      img.src = c.imagen;
      var contenedor = document.createElement('div');
      contenedor.className = 'cursos-datos';
      contenedor.innerHTML = '\n      <nav class="cabecera-curso">\n      <a href="/editar/' + c._id + '">Editar</a>\n      <label id="c' + id + '" eliminar=' + c._id + ' style="cursor: pointer;">Eliminar</label>\n      </nav>\n      <p class="titulo">' + c.titulo + '</p>\n      <p class="informacion">' + c.informacion + '</p>\n      <p class="fecha">Fecha del curso ' + (0, _moment2.default)(c.fecha).add(1, 'days').format('YYYY-MM-DD') + '</p>\n      <p class="costo">Precio $' + c.costo + '</p>\n      ';
      contenedor.appendChild(img);
      cursos.appendChild(contenedor);
      document.querySelector('#c' + id).addEventListener('click', eliminar);
    });
  }).catch(function (err) {
    console.log(err);
  });
}

obteniendo();

},{"moment":1,"uid":2}],2:[function(require,module,exports){
/**
 * Export `uid`
 */

module.exports = uid;

/**
 * Create a `uid`
 *
 * @param {String} len
 * @return {String} uid
 */

function uid(len) {
  len = len || 7;
  return Math.random().toString(35).substr(2, len);
}

},{}]},{},[5]);
