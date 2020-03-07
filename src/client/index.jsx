import React from 'react'
import ReactDom from 'react-dom'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import App from './App.jsx'

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}

ReactDom.hydrate(
    <StyleContext.Provider value={{ insertCss }}>
      <App />
    </StyleContext.Provider>,
    document.getElementById('root')
)
