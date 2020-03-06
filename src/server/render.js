import React from 'react'
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom'
import Routes from '../router/index.jsx'

const render = (req) => {
  const context = {};
  const content = renderToString(
    <StaticRouter location={req.path} context={context}>
      { Routes }
    </StaticRouter>
  )
  const cssStr = context.css || ''
  console.log(cssStr)
  return `
    <html>
      <head>
         <title>ssr</title>
         <style>${cssStr}</style>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/client.bundle.js"></script>
      </body>
    </html>
  `
}

export default render
