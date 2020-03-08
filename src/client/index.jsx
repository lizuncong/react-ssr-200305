import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import getStore from '../redux/store'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import App from './App.jsx'

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}
const store = getStore()
ReactDom.hydrate(
    <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store} >
        <App />
      </Provider>
    </StyleContext.Provider>,
    document.getElementById('root')
)
