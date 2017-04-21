'use strict';

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
.then(data => console.log(data))
.catch(err => {
  console.log(err);
});
