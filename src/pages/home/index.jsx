import React from 'react'
import Header from '../../components/header/index.jsx'
import styles from './index.css';

class Home extends React.Component{

  componentWillMount () {
    if(this.props.staticContext){
      this.props.staticContext.css = styles._getCss()
    }
  }

  render(){
    return (
      <div>
        <Header />
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

export default Home
