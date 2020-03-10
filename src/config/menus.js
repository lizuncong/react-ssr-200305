const menuList = [
  {
    title: '系统配置',
    menuId: '3000',
    url: '/',
    children: [
      {
        title: '首页',
        menuId: '3001',
        url: '/home',
      },
      {
        title: '用户管理',
        menuId: '3002',
        url: '/user',
      },
      {
        title: '角色管理',
        menuId: '3003',
        url: '/role',
      },
    ],
  },
  {
    title: '商品管理',
    menuId: '4000',
    url: '/produce',
    children: [
      {
        title: '商品列表',
        menuId: '4001',
        url: '/produce/list',
      },
      {
        title: '商品分类',
        menuId: '4002',
        url: '/produce/category',
      },
    ],
  },
];
export default menuList;
