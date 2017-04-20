'use strict';

const myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'multipart/form-data'
});

function editar(e){
  let formData = new FormData(document.querySelector('#cursos'));
  e.preventDefault();

  fetch('/editar', {
    method: 'PUT',
    credentials: 'same-origin',
    body: formData
  })
  .then(data => data.json())
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });

}

document.querySelector('#cursos').addEventListener('submit', editar);
