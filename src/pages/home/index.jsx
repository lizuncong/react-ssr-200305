import React from 'react'
import withStyles from 'isomorphic-style-loader/withStyles'
import styles from './index.module.less';

class Home extends React.Component{

  componentDidMount() {
    const { getList, list } = this.props;
    if(!list.length){
      getList()
    }
  }


  render(){
    const { userName, list, changeUserName, dispatch } = this.props;
    // console.log('home...index.jsx', dispatch)
    return (
      <div className={styles.home}>
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
