import React from 'react';
import SideBarLayout from '../layout/sidebar'
import CommonLayout from '../layout/common'
import Detail from '../pages/detail'
import Home from '../pages/home/connect'
import Login from '../pages/login/connect'
import Role from '../pages/role'
import User from '../pages/user'
import ProduceList from '../pages/produce-list'
import ProduceCategory from '../pages/produce-category'

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
      },
      {
        path: '/user',
        component: User,
        key: 'user',
      },
      {
        path: '/role',
        component: Role,
        key: 'role',
      },
      {
        path: '/produce/list',
        component: ProduceList,
        key: 'produceList',
      },
      {
        path: '/produce/category',
        component: ProduceCategory,
        key: 'produceCategory',
      },
    ]
  }
]



export default routes
