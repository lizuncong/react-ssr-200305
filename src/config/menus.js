const menuList = [
  {
    title: '测试',
    menuId: '3000',
    url: '/',
    children: [
      {
        title: '列表',
        menuId: '3001',
        url: '/home',
      },
      {
        title: '列表2',
        menuId: '3002',
        url: '/list2',
      },
      {
        title: '列表3',
        menuId: '3003',
        url: '/list3',
      },
    ],
  },
  {
    title: '测试2',
    menuId: '3000',
    url: '/test2',
    children: [
      {
        title: '列表',
        menuId: '3001',
        url: '/test2/home',
      },
      {
        title: '列表2',
        menuId: '3002',
        url: '/test2/home2',
      },
      {
        title: '列表3',
        menuId: '3003',
        url: '/test2/home3',
      },
    ],
  },
];
export default menuList;
