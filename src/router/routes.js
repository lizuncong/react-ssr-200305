import React from 'react';
import Home from '../pages/home/connect'
import Login from '../pages/login/connect'
import SideBarLayout from '../layout/sidebar'
import CommonLayout from '../layout/common'
import Detail from '../pages/detail'

const routes = [
  {
    path: '/login',
    component: Login,
    key: 'login'
  },
  {
    path: '/common',
    component: CommonLayout,
    key: 'commonLayout',
    routes: [
      {
        path: '/common/detail',
        component: Detail,
        key: 'detail',
      }
    ],
  },
  {
    path: '/',
    component: SideBarLayout,
    key: 'sideBarLayout',
    routes: [
      {
        path: '/home',
        component: Home,
        key: 'home',
        loadData: Home.loadData
      }
    ]
  }
]



export default routes
