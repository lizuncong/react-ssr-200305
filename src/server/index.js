import React from 'react';
import express from 'express';
import render from './render';
const app = express();
const port = 3000;

app.use(express.static('public'))

app.get('/favicon.ico', function (req, res) {
  res.send('hah')
})
app.get('*', function (req, res) {

  const html = render(req)

  res.send(html)
})


app.listen(port, () => console.log(`listening on ${port}`))
