import React from 'react';
import express from 'express';
import proxy from 'express-http-proxy'
import { getServerStore } from '../redux/store'
import render from './render';
import { matchRoutes } from 'react-router-config'
import routes from '../router/routes'
const app = express();
const port = 3000;


app.use(express.static('public'))

// app.use('/api', proxy('http://47.95.113.63', {
//   proxyReqPathResolver: function (req) {
//     return '/ssr/api' + req.url;
//   }
// }));
app.get('/api', function (req, res) {
  setTimeout(() => {
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
  }, 3000)
})

app.get('*', function (req, res) {
  const store = getServerStore()
  // // 参考react-router-dom官网server-rendering指南
  // // 根据路由路径，获取数据并填充store
  const matchedRoutes = matchRoutes(routes, req.path)

  const promises = matchedRoutes.map(item =>
    item.route.loadData && item.route.loadData(store)  // 调用loadData填充store
  ).filter(Boolean)

  Promise.all(promises).then(() => {
    res.send(render(store, routes, req))
  })
})


app.listen(port, () => console.log(`listening on ${port}`))
