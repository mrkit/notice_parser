const express = require('express'),
      server = express(),
      morgan = require('morgan'),
      { resolve } = require('path'),
      { json, urlencoded } = require('body-parser'),
      db = require('./db');

server.use([
  express.static(resolve(__dirname, '..', 'dist')),
  express.static(resolve(__dirname, '..', 'assets')),
  morgan('dev'),
  json(),
  urlencoded({ extended: true })
]);

server.use('/api', require('./api'));

server.get('/*', (req, res) => res.sendFile(resolve(__dirname, '..', 'dist', 'index.html')));

server.use((err, req, res, next) => {
  if(err){
    console.error(`Catch-All Error Message = ${err.message}`);
  }
});

db.conn.sync({force: true})
.then(() => db.seed.njSeed())
.then(() => server.listen(3009, console.log('listening on 3009')));