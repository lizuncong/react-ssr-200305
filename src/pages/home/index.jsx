import React from 'react'
import Header from '../../components/header/index.jsx'
import withStyles from 'isomorphic-style-loader/withStyles'
import styles from './index.css';

class Home extends React.Component{

  componentDidMount() {
    const { getList } = this.props;
    getList()
  }


  render(){
    const { userName, list, changeUserName, dispatch } = this.props;
    // console.log('home...index.jsx', dispatch)
    return (
      <div>
        <Header
          staticContext={this.props.staticContext}
        />
        <div className={styles.title}>
          This is home page !!!
          <div>my name is {userName}</div>
        </div>
        <button
          onClick={() => {
            changeUserName('lizuncong')
          }}
        >
          click me
        </button>
        <div>
          {
            list.map(item => (
                <div key={item.id}>{item.title}</div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Home)
