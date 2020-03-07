import React from 'react'
import Header from '../../components/header/index.jsx'
import withStyles from 'isomorphic-style-loader/withStyles'
import styles from './index.css';

class Home extends React.Component{
  render(){
    return (
      <div>
        <Header
          staticContext={this.props.staticContext}
        />
        <div className={styles.title}>This is home page !!!</div>
        <button
          onClick={() => {
            alert('This is a button!')
          }}
        >
          click me
        </button>
      </div>
    )
  }
}

export default withStyles(styles)(Home)
