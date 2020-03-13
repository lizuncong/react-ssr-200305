import React from 'react';
import loadable from '@loadable/component'
import { getList } from 'src/pages/home/actions'

const SideBarLayout = loadable(() => import(/* webpackChunkName: 'SideBarLayout' */'../layout/sidebar'))
const CommonLayout = loadable(() => import(/* webpackChunkName: 'CommonLayout' */'../layout/common'))
const Detail = loadable(() => import(/* webpackChunkName: 'Detail' */'../pages/detail'))
const Home = loadable(() => import(/* webpackChunkName: 'Home' */'../pages/home/connect'))
const Login = loadable(() => import(/* webpackChunkName: 'Login' */'../pages/login/connect'))
const Role = loadable(() => import(/* webpackChunkName: 'Role' */'../pages/role'))
const User = loadable(() => import(/* webpackChunkName: 'User' */'../pages/user'))
const ProduceList = loadable(() => import(/* webpackChunkName: 'ProduceList' */'../pages/produce-list'))
const ProduceCategory = loadable(() => import(/* webpackChunkName: 'ProduceCategory' */'../pages/produce-category'))

Home.loadData = (store) => {
  return store.dispatch(getList())
}
// import SideBarLayout from '../layout/sidebar'
// import CommonLayout from '../layout/common'
// import Detail from '../pages/detail'
// import Home from '../pages/home/connect'
// import Login from '../pages/login/connect'
// import Role from '../pages/role'
// import User from '../pages/user'
// import ProduceList from '../pages/produce-list'
// import ProduceCategory from '../pages/produce-category'

const routes = [
  {
    path: '/login',
    component: Login,
    title: '登录页',
    chunks: ['Login'],
    key: 'login',
    description: '这是一个登录页哦'
  },
  {
    path: '/common',
    component: CommonLayout,
    key: 'commonLayout',
    chunks: ['CommonLayout'],
    title: '普通布局',
    description: '这是一个普通布局，没有菜单栏的',
    routes: [
      {
        path: '/common/detail',
        chunks: ['Detail'],
        title: '详情页',
        component: Detail,
        key: 'detail',
        description: '这是一个详情页',
      }
    ],
  },
  {
    path: '/',
    component: SideBarLayout,
    key: 'sideBarLayout',
    chunks: ['SideBarLayout'],
    title: '侧边栏布局',
    description: '这是一个侧边栏布局，有菜单的',
    routes: [
      {
        path: '/home',
        component: Home,
        chunks: ['Home'],
        title: '首页',
        description: '这是我的首页',
        key: 'home',
        loadData: Home.loadData
      },
      {
        path: '/user',
        component: User,
        chunks: ['User'],
        title: '用户',
        description: '这是用户页',
        key: 'user',
      },
      {
        path: '/role',
        component: Role,
        chunks: ['Role'],
        description: '这是角色管理页面',
        title: '角色',
        key: 'role',
      },
      {
        path: '/produce/list',
        component: ProduceList,
        chunks: ['ProduceList'],
        description: '这是商品列表页面',
        title: '商品列表',
        key: 'produceList',
      },
      {
        path: '/produce/category',
        component: ProduceCategory,
        chunks: ['ProduceCategory'],
        title: '商品分类',
        description: '这是商品分类页面',
        key: 'produceCategory',
      },
    ]
  }
]



export default routes
