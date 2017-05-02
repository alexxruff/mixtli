'use strict';

import uid from 'uid';
import moment from 'moment';

const myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

function subida(e){
  let formData = new FormData(document.querySelector('#cursos'));
  document.querySelector('#cargando').innerHTML = 'Creando curso... espere un momento';
  e.preventDefault();

  fetch('/subir-archivos', {
    method: 'POST',
    credentials: 'same-origin',
    body: formData
  })
  .then(data => data.json())
  .then(data => {

    let cargando = document.querySelector('#cargando');
    cargando.innerHTML = "El curso se ha creado.";
    obteniendo();
    setTimeout(()=>{
      cargando.innerHTML = '';
    }, 2000);

  })
  .catch(err => {
    console.log(err);
  });
}

document.querySelector('#cursos').addEventListener('submit', subida);

function eliminar(e){

  fetch('/eliminar', {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: myHeaders,
    body: JSON.stringify({
      id: e.toElement.attributes['eliminar'].nodeValue
    })
  })
    .then( res => res.json())
    .then( res => {
      obteniendo();
    })
    .catch(err => {
      console.log(err);
    });
}

function obteniendo(e){
  fetch(`/obtener/${10}`)
  .then(data => data.json())
  .then(data => {
    let cursos = document.querySelector('#cursos-obt');
    cursos.innerHTML = '';
    data.cursos.map(c => {
      let id = uid(25);
      let img = document.createElement('img');
      img.className = "imagen-curso";
      img.src = c.imagen;
      let contenedor = document.createElement('div');
      contenedor.className = 'cursos-datos';
      contenedor.innerHTML = `
      <nav class="cabecera-curso">
      <a href="/editar/${c._id}">Editar</a>
      <label id="c${id}" eliminar=${c._id} style="cursor: pointer;">Eliminar</label>
      </nav>
      <p class="titulo">${c.titulo}</p>
      <p class="informacion">${c.informacion}</p>
      <p class="fecha">Fecha del curso ${moment(c.fecha).add(1, 'days').format('YYYY-MM-DD')}</p>
      <p class="costo">Precio $${c.costo}</p>
      `
      contenedor.appendChild(img);
      cursos.appendChild(contenedor);
      document.querySelector(`#c${id}`).addEventListener('click', eliminar);
    });
  })
  .catch(err => {
    console.log(err);
  });
}

obteniendo();
