import React from 'react'
import { renderToString } from 'react-dom/server';
import {Provider} from "react-redux";
import StyleContext from 'isomorphic-style-loader/StyleContext'
import getStore from '../redux/store'
import App from './App.jsx'

const render = (req) => {
  const css = new Set() // CSS for all rendered React components
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))

  const context = {};
  const store = getStore()
  const content = renderToString(
      <StyleContext.Provider value={{ insertCss }}>
        <Provider store={store} >
          <App req={req} context={context} />
        </Provider>
      </StyleContext.Provider>
  )
  console.log('server...render.js', req.path)


  return `
    <html>
      <head>
         <title>ssr</title>
         <style id="server-side-css">${[...css].join('\n')}</style>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/client.bundle.js"></script>
      </body>
    </html>
  `
}

export default render
