import React from 'react'
import { Link } from 'react-router-dom'
import withStyles from 'isomorphic-style-loader/withStyles'
import styles from './index.css'

class Header extends React.Component{

  render(){
    return (
      <div className={styles.test}>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Header)
