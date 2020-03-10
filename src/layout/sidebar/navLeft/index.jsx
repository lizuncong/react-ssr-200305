import React from 'react'
import withStyles from 'isomorphic-style-loader/withStyles'
import styles from './index.module.less'

class NavLeft extends React.Component{

  render(){
    return(
      <div className={styles.navLeftContent}>
        左边菜单
      </div>
    )
  }
}

export default withStyles(styles)(NavLeft)
