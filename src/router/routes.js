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
    title: '登录页',
    chunks: ['Login'],
    key: 'login'
  },
  {
    path: '/common',
    component: CommonLayout,
    key: 'commonLayout',
    chunks: ['CommonLayout'],
    title: '普通布局',
    routes: [
      {
        path: '/common/detail',
        chunks: ['Detail'],
        title: '详情页',
        component: Detail,
        key: 'detail',
      }
    ],
  },
  {
    path: '/',
    component: SideBarLayout,
    key: 'sideBarLayout',
    chunks: ['SideBarLayout'],
    title: '侧边栏布局',
    routes: [
      {
        path: '/home',
        component: Home,
        chunks: ['Home'],
        title: '首页',
        key: 'home',
        loadData: Home.loadData
      },
      {
        path: '/user',
        component: User,
        chunks: ['User'],
        title: '用户',
        key: 'user',
      },
      {
        path: '/role',
        component: Role,
        chunks: ['Role'],
        title: '角色',
        key: 'role',
      },
      {
        path: '/produce/list',
        component: ProduceList,
        chunks: ['ProduceList'],
        title: '商品列表',
        key: 'produceList',
      },
      {
        path: '/produce/category',
        component: ProduceCategory,
        chunks: ['ProduceCategory'],
        title: '商品分类',
        key: 'produceCategory',
      },
    ]
  }
]



export default routes
