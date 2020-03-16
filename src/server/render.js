import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import {Provider} from "react-redux";
import { ChunkExtractor } from '@loadable/server'
import path from 'path'
import Html from './html'
import Router from '../router'


const webStats = path.resolve(
  __dirname,
  '../dist/web/assets/loadable-stats-client.json',
)

const render = (store, routes, matchedRoutes, req) => {
  const mRoute = matchedRoutes[matchedRoutes.length - 1] || {}
  const route = mRoute.route || {};

  const webExtractor = new ChunkExtractor({ statsFile: webStats, entrypoints: ['client'] })

  const data = {
    title: route.title || '',
    description: route.description || '',
  }
  const context = {};

  const jsx = webExtractor.collectChunks(
      <Provider store={store} >
        <Router serverSide req={req} context={context} />
      </Provider>
  )

  // 这里是个坑，renderToString方法一定要在webExtractor.getScriptElements，
  // webExtractor.getLinkElements，webExtractor.getStyleTags方法前面执行，不然会有
  // 问题，1.控制台会提示Did not expect server HTML to contain a <div>
  // in <div>  2. 首次渲染的时候会有闪烁
  const content = renderToString(jsx)


  const scriptTags = webExtractor.getScriptElements()
  const linkTags = webExtractor.getLinkElements()
  const styleTags = webExtractor.getStyleElements()


  data.scriptTags = scriptTags
  data.linkTags = linkTags;
  data.styleTags = styleTags;
  data.state = store.getState()
  data.children = content

  data.cssLinks = [
    // "https://cdnjs.cloudflare.com/ajax/libs/antd/4.0.1/antd.min.css"
  ]

  console.log('server....render.js')
  const html = renderToStaticMarkup(<Html {...data} />)
  return `<!doctype html>${html}`
}

export default render
