import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { loadableReady } from '@loadable/component'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { getClientStore } from '../redux/store'
import Router from '../router'

loadableReady(() => {
  const store = getClientStore()
  const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss())
    return () => removeCss.forEach(dispose => dispose())
  }
  const root = document.getElementById('main')
  ReactDom.hydrate(
    <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store} >
        <Router />
      </Provider>
    </StyleContext.Provider>,
    root
  )
})

