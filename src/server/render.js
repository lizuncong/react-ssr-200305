import React from 'react'
import { renderToString } from 'react-dom/server';
import StyleContext from 'isomorphic-style-loader/StyleContext'
import App from './App.jsx'

const render = (req) => {
  const css = new Set() // CSS for all rendered React components
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))

  const context = {};
  const content = renderToString(
      <StyleContext.Provider value={{ insertCss }}>
        <App req={req} context={context} />
      </StyleContext.Provider>
  )
  console.log('server...render.js', req.path)


  return `
    <html>
      <head>
         <title>ssr</title>
         <style>${[...css].join('\n')}</style>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/client.bundle.js"></script>
      </body>
    </html>
  `
}

export default render
