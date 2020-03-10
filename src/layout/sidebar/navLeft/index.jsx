import React from 'react'
import withStyles from 'isomorphic-style-loader/withStyles'
import styles from './index.module.less'
import Menu from 'components/menu'
import menus from '../../../config/menus'

class NavLeft extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      menuData: [],
      currentUrl: '',
    }
  }

  componentWillMount(){
    this.setState({
      menuData: menus
    })
  }

  componentDidMount(){

    const currentUrl = window.location.pathname;
    this.setState({
      currentUrl
    })
  }

  handleClick(menuItem) {
    const { switchMenu } = this.props;
    const menuName = menuItem.item.props.children.props.children;
    switchMenu({ menuId: menuItem.url, menuName });
    this.setState({
      currentUrl: menuItem.key,
    });
  }

  render(){
    const { currentUrl, menuData } = this.state;
    console.log('currentUrl..', currentUrl)
    return(
      <div className={styles.navLeftContent}>
        <div className={styles.logo}>
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>MTAdmin</h1>
        </div>
        <Menu
          menuData={menuData}
          selectedKeys={[currentUrl]}
          onClick={(menuItem) => this.handleClick(menuItem)}
        />
      </div>
    )
  }
}

export default withStyles(styles)(NavLeft)
