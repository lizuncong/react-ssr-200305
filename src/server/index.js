import React from 'react';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import path from 'path';
import { getServerStore } from '../redux/store';
import render from './render';
import routes from '../router/routes';

const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, 'web')));


app.get('/api/list', (req, res) => {
  res.send([
    {
      id: '1',
      title: '测试数据1',
    },
    {
      id: '2',
      title: '测试数据2',
    },
    {
      id: '3',
      title: '测试数据3',
    },
  ]);
});

let isLogin = false;

app.get('/api/userInfo', (req, res) => {
  res.send(isLogin);
});
app.get('/api/login', (req, res) => {
  isLogin = !isLogin;
  res.send(isLogin);
});
app.get('/favicon.ico', (req, res) => {
  res.send('test');
});
app.get('*', (req, res) => {
  const store = getServerStore(req);
  // // 参考react-router-dom官网server-rendering指南
  // // 根据路由路径，获取数据并填充store
  const matchedRoutes = matchRoutes(routes, req.path);
  const promises = [];

  matchedRoutes.forEach((item) => {
    if (item.route.loadData) {
      const promise = new Promise((resolve, reject) => {
        item.route.loadData(store).then(resolve).catch(resolve);
      });
      promises.push(promise);
    }
  });
  //
  // console.log(promises)
  Promise.all(promises).then(() => {
    const mRoute = matchedRoutes[matchedRoutes.length - 1] || {};
    const route = mRoute.route || {};
    const status = route.status || 200;
    const context = {};
    const html = render(store, routes, matchedRoutes, req, context);

    if (context.action === 'REPLACE') { // 需要重定向
      res.redirect(301, context.url);
      return;
    }

    res.status(status);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });
});

if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('../router/index.jsx');
} else {
  app.listen(port, () => console.log(`listening on ${port}`));
}

export default app;
