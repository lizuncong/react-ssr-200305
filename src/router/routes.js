import React from 'react';
import loadable from '@loadable/component'

const SideBarLayout = loadable(() => import(/* webpackChunkName: 'SideBarLayout' */'../layout/sidebar'))
const CommonLayout = loadable(() => import(/* webpackChunkName: 'CommonLayout' */'../layout/common'))
const Detail = loadable(() => import(/* webpackChunkName: 'Detail' */'../pages/detail'))
const Home = loadable(() => import(/* webpackChunkName: 'Home' */'../pages/home/connect'))
const Login = loadable(() => import(/* webpackChunkName: 'Login' */'../pages/login/connect'))
const Role = loadable(() => import(/* webpackChunkName: 'Role' */'../pages/role'))
const User = loadable(() => import(/* webpackChunkName: 'User' */'../pages/user'))
const ProduceList = loadable(() => import(/* webpackChunkName: 'ProduceList' */'../pages/produce-list'))
const ProduceCategory = loadable(() => import(/* webpackChunkName: 'ProduceCategory' */'../pages/produce-category'))

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
