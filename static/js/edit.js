'use strict';

import moment from 'moment';

const myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'multipart/form-data'
});

function editar(e){
  let formData = new FormData(document.querySelector('#cursos'));
  document.querySelector('#cargando').innerHTML = 'Actualizando curso... espere un momento';
  e.preventDefault();

  fetch('/editar', {
    method: 'PUT',
    credentials: 'same-origin',
    body: formData
  })
  .then(data => data.json())
  .then(data => {
    let cargando = document.querySelector('#cargando');
    cargando.innerHTML = "Actualizando el curso";
    obteniendo();
    setTimeout(()=>{
      cargando.innerHTML = '';
    }, 2000);
  })
  .catch(err => {
    console.log(err);
  });

}

document.querySelector('#cursos').addEventListener('submit', editar);

function obteniendo(e){
  fetch(`/editando/${document.querySelector('#id').value}`)
  .then(data => data.json())
  .then(c => {
    let cursos = document.querySelector('#cursos-obt');
    cursos.innerHTML = '';
    let img = document.createElement('img');
    img.className = "imagen-curso";
    img.src = c.info.imagen;
    let contenedor = document.createElement('div');
    contenedor.className = 'cursos-datos';
    contenedor.innerHTML = `
    <p class="titulo">${c.info.titulo}</p>
    <p class="informacion">${c.info.informacion}</p>
    <p class="fecha">Fecha del curso ${(moment(c.info.fecha).add(1, 'days').format('YYYY-MM-DD'))}</p>
    <p class="costo">Precio $${c.info.costo}</p>
    `
    contenedor.appendChild(img);
    cursos.appendChild(contenedor);
  })
  .catch(err => {
    console.log(err);
  });
}

obteniendo();
