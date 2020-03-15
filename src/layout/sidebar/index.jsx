import React from 'react'
// import withStyles from 'isomorphic-style-loader/withStyles'
import NavLeft from './navLeft'
import Header from './header'
import styles from './index.module.less'

class SideBarLayout extends React.Component{
  render(){
    const { children } = this.props;
    return(
      <div className={styles.container}>
        <NavLeft />
        <div className={styles.main}>
          <Header />
          { children }
        </div>
      </div>
    )
  }
}

// export default withStyles(styles)(SideBarLayout)
export default SideBarLayout
