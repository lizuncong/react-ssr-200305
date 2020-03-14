import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import {Provider} from "react-redux";
import { ChunkExtractor } from '@loadable/server'
import path from 'path'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import Html from './html'
import Router from '../router'
import chunks from './chunk-manifest.json';


const nodeStats = path.resolve(
  __dirname,
  '../dist/loadable-stats-server.json',
)

const webStats = path.resolve(
  __dirname,
  '../dist/public/assets/loadable-stats-client.json',
)

const render = (store, routes, matchedRoutes, req) => {

  const mRoute = matchedRoutes[matchedRoutes.length - 1] || {}
  const route = mRoute.route || {};


  // const extractor = new ChunkExtractor({ statsFile, entrypoints: ['server'] })

  // const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats, entrypoints: ['server'] })
  const webExtractor = new ChunkExtractor({ statsFile: webStats, entrypoints: ['client'] })

  // const { default: App } = nodeExtractor.requireEntrypoint()

  // console.log(App)

  const css = new Set() // CSS for all rendered React components
  const insertCss = (...styles) => styles.forEach(style => {
    css.add(style._getCss())
  })

  const data = {
    title: route.title || '',
    description: route.description || '',
  }
  const context = {};

  const jsx = webExtractor.collectChunks(<StyleContext.Provider value={{ insertCss }}>
    <Provider store={store} >
      <Router serverSide req={req} context={context} />
    </Provider>
  </StyleContext.Provider>)

  const content = renderToString(jsx)
  console.log('content...', content)
  data.state = store.getState()
  data.children = content
  // // You can now collect your script tags
  // const scriptTags = extractor.getScriptTags() // or extractor.getScriptElements();
  // // You can also collect your "preload/prefetch" links
  // const linkTags = extractor.getLinkTags() // or extractor.getLinkElements();
  // // And you can even collect your style tags (if you use "mini-css-extract-plugin")
  // const styleTags = extractor.getStyleTags() // or extractor.getStyleElements();
  // console.log('scriptTags...', scriptTags)
  // console.log('linkTags...', linkTags)
  // console.log('styleTags...', styleTags)
  data.styles = [{ id: 'server-side-css', cssText: [...css].join('') }];

  const scripts = new Set();
  const addChunk = chunk => {
    if (chunks[chunk]) {
      chunks[chunk].forEach(asset => scripts.add(asset));
    } else {
      throw new Error(`${chunk}没找到`);
    }
  };
  addChunk('client');
  matchedRoutes.forEach(rou => {
    if (rou.chunk) addChunk(rou.chunk);
    if (rou.chunks) rou.chunks.forEach(addChunk);
  })


  data.scripts = Array.from(scripts);
  data.cssLinks = [
    "https://cdnjs.cloudflare.com/ajax/libs/antd/4.0.1/antd.min.css"
  ]
  const html = renderToStaticMarkup(<Html {...data} />)
  return `<!doctype html>${html}`
}

export default render
