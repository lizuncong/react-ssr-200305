import React from 'react'
import { Link } from 'react-router-dom'
import withStyles from 'isomorphic-style-loader/withStyles'
import styles from './index.css'

class Header extends React.Component{

  render(){
    return (
      <div className={styles.test}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>
    )
  }
}

export default withStyles(styles)(Header)
