import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import {Provider} from "react-redux";
import { ChunkExtractor } from '@loadable/server'
import path from 'path'
// import StyleContext from 'isomorphic-style-loader/StyleContext'
import Html from './html'
import Router from '../router'


// const nodeStats = path.resolve(
//   __dirname,
//   '../dist/loadable-stats-server.json',
// )

const webStats = path.resolve(
  __dirname,
  '../dist/web/assets/loadable-stats-client.json',
)

const render = (store, routes, matchedRoutes, req) => {

  const mRoute = matchedRoutes[matchedRoutes.length - 1] || {}
  const route = mRoute.route || {};


  // const extractor = new ChunkExtractor({ statsFile, entrypoints: ['server'] })

  // const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats, entrypoints: ['server'] })
  const webExtractor = new ChunkExtractor({ statsFile: webStats, entrypoints: ['client'] })
  // const webExtractor = new ChunkExtractor({ statsFile: nodeStats, entrypoints: ['server'] })

  // const { default: App } = nodeExtractor.requireEntrypoint()

  // console.log(App)

  // const css = new Set() // CSS for all rendered React components
  // const insertCss = (...styles) => styles.forEach(style => {
  //   css.add(style._getCss())
  // })

  const data = {
    title: route.title || '',
    description: route.description || '',
  }
  const context = {};

  // const jsx = webExtractor.collectChunks(
  //   <StyleContext.Provider value={{ insertCss }}>
  //     <Provider store={store} >
  //       <Router serverSide req={req} context={context} />
  //     </Provider>
  //   </StyleContext.Provider>
  // )

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
  // const linkTags = webExtractor.getLinkElements()
  const linkTags = webExtractor.getLinkElements()
  const styleTags = webExtractor.getStyleElements()


  data.scriptTags = scriptTags
  data.linkTags = linkTags;
  data.styleTags = styleTags;
  data.state = store.getState()
  data.children = content


  // data.styles = [{ id: 'server-side-css', cssText: [...css].join('') }];
  data.styles = [];
  const scripts = new Set();

  // 使用loadable生成的chunk，如果自己根据路由去取对应的chunk会有问题
  // const addChunk = chunk => {
  //   if (chunks[chunk]) {
  //     chunks[chunk].forEach(asset => scripts.add(asset));
  //   } else {
  //     throw new Error(`${chunk}没找到`);
  //   }
  // };
  // addChunk('client');
  // matchedRoutes.forEach(rou => {
  //   if (rou.chunk) addChunk(rou.chunk);
  //   if (rou.chunks) rou.chunks.forEach(addChunk);
  // })


  data.scripts = Array.from(scripts);
  data.cssLinks = [
    // "https://cdnjs.cloudflare.com/ajax/libs/antd/4.0.1/antd.min.css"
  ]
  // styleTags.forEach(style => {
  //   data.cssLinks.push(style.key)
  // })
  //
  // console.log('data....', scriptTags)
  // console.log('data....', linkTags)
  // console.log('data....', styleTags)
  // console.log('element...', webExtractor.getScriptElements())
  console.log('server....render.js')
  const html = renderToStaticMarkup(<Html {...data} />)
  return `<!doctype html>${html}`
}

export default render
