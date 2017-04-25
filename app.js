'use strict';

// Importando los modulos para el Servidor
const express    = require('express');
const parser     = require('body-parser');
const multer     = require('multer');
const path       = require('path');
const fs         = require('fs-extra');
const nunjucks   = require('nunjucks');
const moment     = require('moment');
const nodemailer = require('nodemailer');
const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;

// Importando modulos creados
const schema  = require('./models/schema');
const mensaje = require('./models/templateMail');

// Iniciamos el Servidor
const app = express();

// Usamos los middlewares para manejo de json en peticiones
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './static/')));
app.set('view engine', 'html');

// Hacemos la conexion a la base de datos
/*const connect = mongoose.connect('mongodb://mixtli:m1xtli@ds119151.mlab.com:19151/mixtli', (err, data) => {

  if(err) throw err;

  console.log('conexion a la base de datos realizada');

});*/

// Destino donde se colocaran las imagenes subidas
const storage = multer.diskStorage({
  destination(sol, file, fn){
    fn(null, path.join(__dirname, './static/imagenes'));
  },
  filename(sol, file, fn){
    fn(null, Date.now() + file.originalname);
  }
});

const subida = multer({
  storage: storage,
  limits: {
    fieldSize: 50000
  },
  onError(err, next){
    next(err);
  }
});

// Configuracion del mototo de vistas
nunjucks.configure(path.join(__dirname, './templates'), {
  autoscape: true,
  express: app,
  noCache: true,
  watch: false
});

// Mostramos las vistas usando las rutas
app.get('/', (sol, res)=> {
    res.render('index');
});

app.get('/agregando-cursos', (sol, res)=> {

  res.render('nuevo');

});

app.get('/editar/:id', (sol, res) => {

  schema.cursos.findOne({"_id": sol.params.id})
    .then(data => {
      if(data == null){
        res.redirect('/');
      }else {
        res.render('editar',{ info: data, fecha: moment(data.fecha).add(1, 'days').format('YYYY-MM-DD')});
      }

    })
    .catch(err => {
      throw err;
    })

});

app.get('/obtener/:limite', (sol, res) => {

  schema.cursos.find({}, null, {limit: Number(sol.params.limite)})
    .sort({_id: -1})
    .then(data => res.json({cursos: data}))
    .catch(err => {
      throw err;
    });

});

app.get('/editando/:id', (sol, res)=> {
  schema.cursos.findOne({"_id": sol.params.id})
    .then(data => {

      res.json({ info: data});

    })
    .catch(err => {
      throw err;
    })
});

// Envio de correos desde el formulario
app.post('/formulario', (sol, res)=> {

  let transporter = nodemailer.createTransport({
    service: 'zoho',
    auth: {
      user: '',
      pass: ''
    }
  });

  let mailOptions = {
    from: 'Informacion de formulario <>',
    to: '',
    subject: 'Contacto de persona',
    text: sol.body.email,
    html: mensaje(sol)
  }

  transporter.sendMail(mailOptions, (err, info) => {

    if(err) res.json(err)
    res.json(info)

  });

});

app.post('/subir-archivos', subida.single('cursos'), (sol, res)=> {

  let curso = new schema.cursos({
    titulo: sol.body.titulo,
    fecha: sol.body.fecha,
    informacion: sol.body.informacion,
    imagen: sol.file.filename,
    costo: sol.body.costo
  });

  curso.save()
    .then(data => res.json({succes: true}))
    .catch(err => {
      res.json({succes: err});
    });

});

app.put('/editar', subida.single('cursos'), (sol, res)=> {

  let actualizacion = sol.file == undefined ? {titulo: sol.body.titulo, fecha: sol.body.fecha, informacion: sol.body.informacion, costo: sol.body.costo} : {titulo: sol.body.titulo, fecha: sol.body.fecha, informacion: sol.body.informacion, imagen: sol.file.filename, costo: sol.body.costo}

  schema.cursos.update({"_id": sol.body.id}, actualizacion, err => {

    if(err)
    {
      throw err
    }else{

      res.json({success: true});

    }

  });

});

app.delete('/eliminar', (sol, res)=> {

  schema.cursos.findOneAndRemove({"_id": sol.body.id}, (err, resp) =>{

    if(err){

      throw err;

    }else{

      res.json({success:resp});

    }

  });
});

// Levantamos el Servidor
app.listen(2000, () => console.log('servidor ejecutanose en el puerto 2000'));
