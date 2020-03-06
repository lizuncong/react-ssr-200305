import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.css'

class Header extends React.Component{

  componentWillMount () {
    if(this.props.staticContext){
      this.props.staticContext.css = styles._getCss()
    }
  }

  render(){
    return (
      <div className={styles.test}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>
    )
  }
}

export default Header
