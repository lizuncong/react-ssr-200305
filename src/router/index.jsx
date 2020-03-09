import React from 'react';
import Home from '../pages/home/connect'
import Login from '../pages/login/connect'
import Test from '../pages/test/index'
import App from '../App';

const routes = [
  {
    path: '/',
    component: App,
    key: 'app',
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
        key: 'home',
        loadData: Home.loadData,
        // routes: [
        //   {
        //     path: '/test',
        //     component: Test,
        //     // exact: true,
        //     key: 'test',
        //   }
        // ]
      },
      {
        path: '/login',
        component: Login,
        key: 'login',
        exact: true
      }
    ]
  }
]



export default routes
