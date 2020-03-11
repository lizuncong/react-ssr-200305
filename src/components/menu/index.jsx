import React from 'react'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom';
// import 'antd/lib/menu/style'
// import menuStyles from '!!isomorphic-style-loader!css-loader!less-loader?javascriptEnabled=true!antd/lib/menu/style/index.less'
// import withStyles from 'isomorphic-style-loader/withStyles'

const { SubMenu } = Menu

class IMenu extends React.Component{


  // 菜单渲染
  renderMenu(data) {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.url}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.url}>
          <NavLink to={item.url}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  }

  render(){
    const { selectedKeys, menuData, onClick } = this.props;
    return (
      <Menu
        onClick={(menuItem) => onClick(menuItem)}
        selectedKeys={selectedKeys}
        mode="vertical"
        theme="dark"
      >
        { this.renderMenu(menuData) }
      </Menu>
    )
  }
}

// export default withStyles()(IMenu)
export default IMenu
