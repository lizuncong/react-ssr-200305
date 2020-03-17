import React from 'react';
import loadable from '@loadable/component';
import { getList } from 'src/pages/home/actions';
import { getUserInfo } from 'src/pages/login/actions';

const SideBarLayout = loadable(() => import(/* webpackChunkName: 'sideBarLayout' */'../layout/sidebar'));
const CommonLayout = loadable(() => import(/* webpackChunkName: 'commonLayout' */'../layout/common'));
const Detail = loadable(() => import(/* webpackChunkName: 'detail' */'../pages/detail'));
const Home = loadable(() => import(/* webpackChunkName: 'home' */'../pages/home/connect'));
const Login = loadable(() => import(/* webpackChunkName: 'login' */'../pages/login/connect'));
const Role = loadable(() => import(/* webpackChunkName: 'role' */'../pages/role'));
const User = loadable(() => import(/* webpackChunkName: 'user' */'../pages/user'));
const ProduceList = loadable(() => import(/* webpackChunkName: 'produceList' */'../pages/produce-list'));
const ProduceCategory = loadable(() => import(/* webpackChunkName: 'produceCategory' */'../pages/produce-category'));

const routes = [
  {
    path: '/login',
    component: Login,
    title: '登录页',
    // chunks: ['Login'],
    key: 'login',
    description: '这是一个登录页哦',
    loadData: (store) => store.dispatch(getUserInfo()),
  },
  {
    path: '/common',
    component: CommonLayout,
    key: 'commonLayout',
    // chunks: ['CommonLayout'],
    title: '普通布局',
    description: '这是一个普通布局，没有菜单栏的',
    routes: [
      {
        path: '/common/detail',
        // chunks: ['Detail'],
        title: '详情页',
        component: Detail,
        key: 'detail',
        description: '这是一个详情页',
      },
    ],
  },
  {
    path: '/',
    component: SideBarLayout,
    key: 'sideBarLayout',
    // chunks: ['SideBarLayout'],
    title: '侧边栏布局',
    description: '这是一个侧边栏布局，有菜单的',
    routes: [
      {
        path: '/home',
        component: Home,
        // chunks: ['Home'],
        title: '首页',
        description: '这是我的首页',
        key: 'home',
        loadData: (store) => store.dispatch(getList()),
      },
      {
        path: '/user',
        component: User,
        // chunks: ['User'],
        title: '用户',
        description: '这是用户页',
        key: 'user',
      },
      {
        path: '/role',
        component: Role,
        // chunks: ['Role'],
        description: '这是角色管理页面',
        title: '角色',
        key: 'role',
      },
      {
        path: '/produce/list',
        component: ProduceList,
        // chunks: ['ProduceList'],
        description: '这是商品列表页面',
        title: '商品列表',
        key: 'produceList',
      },
      {
        path: '/produce/category',
        component: ProduceCategory,
        // chunks: ['ProduceCategory'],
        title: '商品分类',
        description: '这是商品分类页面',
        key: 'produceCategory',
      },
    ],
  },
];


export default routes;
