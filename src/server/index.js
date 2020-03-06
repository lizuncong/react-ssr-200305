import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import Home from '../pages/home/index.jsx'

const app = express();
const port = 3000;

app.use(express.static('public'))
const content = renderToString(<Home />)
app.get('/', function (req, res) {
  res.send(`
    <html>
      <head>
         <title>ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/client.bundle.js"></script>
      </body>
    </html>
  `)
})


app.listen(port, () => console.log(`listening on ${port}`))
