require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({3:[function(require,module,exports){
'use strict';

var myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

document.querySelector('#form-contact').addEventListener('submit', function (e) {
  e.preventDefault();
  fetch('/formulario', {
    method: 'POST',
    credentials: 'same-origin',
    headers: myHeaders,
    body: JSON.stringify({
      nombre: document.querySelector('#nombre').value,
      email: document.querySelector('#email').value,
      numero: document.querySelector('#numero').value,
      mensaje: document.querySelector('#mensaje').value
    })
  }).then(function (data) {
    return data.json();
  }).then(function (data) {
    if (data.code == undefined) {
      document.querySelector('#nombre').value = '';
      document.querySelector('#email').value = '';
      document.querySelector('#numero').value = '';
      document.querySelector('#mensaje').value = '';
    } else {
      console.log(data, 'error al enviar');
    }
  }).catch(function (err) {
    console.log(err);
  });
});

fetch('/obtener/' + 3).then(function (data) {
  return data.json();
}).then(function (data) {
  return console.log(data);
}).catch(function (err) {
  console.log(err);
});

},{}]},{},[3]);
