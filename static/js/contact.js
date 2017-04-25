'use strict';

import moment from 'moment';

const myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});


document.querySelector('#form-contact').addEventListener('submit', (e)=> {
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
  })
  .then(data => data.json())
  .then(data => {
    if(data.code == undefined){
      document.querySelector('#nombre').value = '';
      document.querySelector('#email').value = '';
      document.querySelector('#numero').value = '';
      document.querySelector('#mensaje').value = '';
    }else{
      console.log(data, 'error al enviar');
    }
  })
  .catch(err => {
    console.log(err);
  });
});

fetch(`/obtener/${3}`)
.then(data => data.json())
.then(data => {
  let cursos = document.querySelector('#vista-cursos');
  data.cursos.map(c => {

    let contenedor = document.createElement('div');
    contenedor.className = 'contenedor-curso-article';
    contenedor.innerHTML = `
      <h3>${c.titulo}</h3>
      <img src='/imagenes/${c.imagen}' class="imagen-de-cursos">
      <p>${c.informacion}</p>
      <span class="fecha">Fecha: ${moment(c.fecha).add(1, 'days').format('YYYY-MM-DD')}</span>
      <span class="costo">Costo $${c.costo} pesos</span>
    `;
    cursos.appendChild(contenedor);

  });
})
.catch(err => {
  console.log(err);
});
