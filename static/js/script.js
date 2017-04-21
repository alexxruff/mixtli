'use strict';

import uid from 'uid';

const myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

function subida(e){
  let formData = new FormData(document.querySelector('#cursos'));
  e.preventDefault();

  fetch('/subir-archivos', {
    method: 'POST',
    credentials: 'same-origin',
    body: formData
  })
  .then(data => data.json())
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });
}

document.querySelector('#cursos').addEventListener('submit', subida);

function eliminar(e){
  console.log(e.toElement.attributes['eliminar'].nodeValue);
  fetch('/eliminar', {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: myHeaders,
    body: JSON.stringify({
      id: e.toElement.attributes['eliminar'].nodeValue
    })
  })
    .then( res => res.json())
    .then( res => console.log(res))
    .catch(err => {
      console.log(err);
    });
}

fetch('/obtener')
  .then(data => data.json())
  .then(data => {
    let cursos = document.querySelector('#cursos-obt');
    data.cursos.map(c => {
      let id = uid(25);
      let img = document.createElement('img');
      img.className = "imagen-curso";
      img.src = `imagenes/${c.imagen}`;
      let contenedor = document.createElement('div');
      contenedor.className = 'cursos-datos';
      contenedor.innerHTML = `
        <nav class="cabecera-curso">
          <a href="/editar/${c._id}">Editar</a>
          <label id="c${id}" eliminar=${c._id} style="cursor: pointer;">Eliminar</label>
        </nav>
        <p>${c.titulo}</p>
        <p>${c.informacion}</p>
        <p>${c.fecha}</p>
        <p>${c.costo}</p>
      `
      contenedor.appendChild(img);
      cursos.appendChild(contenedor);
      document.querySelector(`#c${id}`).addEventListener('click', eliminar);
    });
  })
  .catch(err => {
    console.log(err);
  });
