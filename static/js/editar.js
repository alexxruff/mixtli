require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({3:[function(require,module,exports){
'use strict';

var myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'multipart/form-data'
});

function editar(e) {
  var formData = new FormData(document.querySelector('#cursos'));
  e.preventDefault();

  fetch('/editar', {
    method: 'PUT',
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

document.querySelector('#cursos').addEventListener('submit', editar);

},{}]},{},[3]);
