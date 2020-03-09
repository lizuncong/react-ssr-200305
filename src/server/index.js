import React from 'react';
import express from 'express';
import render from './render';
const app = express();
const port = 3000;

app.use(express.static('public'))

app.get('/api/*', function(req, res){
  const list = [
    {
      id: 1,
      title: '数据1'
    },
    {
      id: 2,
      title: '数据2'
    },
    {
      id: 3,
      title: '数据3'
    },
    {
      id: 4,
      title: '数据4'
    },
    {
      id: 5,
      title: '数据5'
    },
  ]
  setTimeout(() => {
    res.send({
      code: 0,
      data: list
    })
  }, 5000)
})

app.get('*', function (req, res) {

  const html = render(req)

  res.send(html)
})


app.listen(port, () => console.log(`listening on ${port}`))
