import React from 'react'
import { renderToString } from 'react-dom/server';
import {Provider} from "react-redux";
import StyleContext from 'isomorphic-style-loader/StyleContext'
import Router from '../router'

const render = (store, routes, req) => {
  const css = new Set() // CSS for all rendered React components
  const insertCss = (...styles) => styles.forEach(style => {
    css.add(style._getCss())
  })

  const context = {};


    const content = renderToString(
      <StyleContext.Provider value={{ insertCss }}>
        <Provider store={store} >
          <Router serverSide req={req} context={context} />
        </Provider>
      </StyleContext.Provider>
    )

    console.log('content...', content)

    return `
              <html>
                <head>
                   <title>ssr</title>
                   <link href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.0.1/antd.min.css" rel="stylesheet">
                   <style id="server-side-css">${[...css].join('\n')}</style>
                </head>
                <body>
                  <div id="root">${content}</div>
                  <script>
                    window.INITIAL_STATE=${JSON.stringify(store.getState())}
                  </script>
                  <script src="/client.bundle.js"></script>
                </body>
              </html>
            `
}

export default render
