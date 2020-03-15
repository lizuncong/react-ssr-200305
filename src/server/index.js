import React from 'react';
import express from 'express';
import proxy from 'express-http-proxy'
import { getServerStore } from '../redux/store'
import render from './render';
import { matchRoutes } from 'react-router-config'
import routes from '../router/routes'
import path from "path"
const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, 'web')))

// app.use('/api', proxy('http://47.95.113.63', {
//   proxyReqPathResolver: function (req) {
//     return '/ssr/api' + req.url;
//   }
// }));
app.get('/api', function (req, res) {
  res.send([
    {
      id: '1',
      title: '测试数据1'
    },
    {
      id: '2',
      title: '测试数据2'
    },
    {
      id: '3',
      title: '测试数据3'
    },
  ])
})

app.get('*', function (req, res) {
  const store = getServerStore()
  // // 参考react-router-dom官网server-rendering指南
  // // 根据路由路径，获取数据并填充store
  const matchedRoutes = matchRoutes(routes, req.path)
  const promises = matchedRoutes.map(item => {
    return item.route.loadData && item.route.loadData(store)  // 调用loadData填充store
  }).filter(Boolean)

  Promise.all(promises).then(() => {
    const mRoute = matchedRoutes[matchedRoutes.length - 1] || {}
    const route = mRoute.route || {};
    res.status(route.status || 200);
    res.set('content-type', 'text/html')
    res.send(render(store, routes, matchedRoutes, req))
  })
})


app.listen(port, () => console.log(`listening on ${port}`))
