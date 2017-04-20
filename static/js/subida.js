require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({3:[function(require,module,exports){
'use strict';

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

function subida(e) {
  var formData = new FormData(document.querySelector('#cursos'));
  e.preventDefault();

  fetch('/subir-archivos', {
    method: 'POST',
    credentials: 'same-origin',
    body: formData
  }).then(function (data) {
    return data.json();
  }).then(function (data) {
    return console.log(data);
  }).catch(function (err) {
    console.log(err);
  });
}

document.querySelector('#cursos').addEventListener('submit', subida);

function eliminar(e) {
  console.log(e.toElement.attributes['eliminar'].nodeValue);
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
    return console.log(res);
  }).catch(function (err) {
    console.log(err);
  });
}

fetch('/obtener').then(function (data) {
  return data.json();
}).then(function (data) {
  var cursos = document.querySelector('#cursos-obt');
  data.cursos.map(function (c) {
    var id = (0, _uid2.default)(25);
    var img = document.createElement('img');
    img.width = "300";
    img.height = "300";
    img.src = 'imagenes/' + c.imagen;
    var contenedor = document.createElement('div');
    contenedor.innerHTML = '\n        <a href="/editar/' + c._id + '">Editar</a>\n        <label id="c' + id + '" eliminar=' + c._id + ' style="cursor: pointer;">Eliminar</a>\n        <p>' + c.titulo + '</p>\n        <p>' + c.informacion + '</p>\n        <p>' + c.fecha + '</p>\n        <p>' + c.costo + '</p>\n      ';
    contenedor.appendChild(img);
    cursos.appendChild(contenedor);
    document.querySelector('#c' + id).addEventListener('click', eliminar);
  });
}).catch(function (err) {
  console.log(err);
});

},{"uid":1}],1:[function(require,module,exports){
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

},{}]},{},[3]);
