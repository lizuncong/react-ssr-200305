import React from 'react';
import express from 'express';
import { renderToString, renderToStaticMarkup, renderToNodeStream, renderToStaticNodeStream } from 'react-dom/server';
import Home from '../pages/home/index.jsx'

const app = express();
const port = 3000;
app.get('*', function (req, res) {
  console.log(renderToString(<Home />))
  console.log(renderToStaticMarkup(<Home />))
  console.log(renderToNodeStream(<Home />))
  console.log(renderToStaticNodeStream(<Home />))
  console.log('==========')
  res.send(`
    <html>
      <head>
         <title>ssr</title>
      </head>
      <body>
        <div>ssr test</div>
      </body>
    </html>
  `)
})


app.listen(port, () => console.log(`listening on ${port}`))
