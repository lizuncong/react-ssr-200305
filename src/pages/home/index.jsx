import React from 'react'
import withStyles from 'isomorphic-style-loader/withStyles'
import { Modal } from 'antd'
import styles from './index.module.less';
// const { confirm } = Modal;
import elephant from '../../resource/images/elephant.jpg';
import bigImg from '../../resource/images/big.png';

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
          <img
            src={elephant}
            alt=""
            style={{ width: '100px', height: '100px' }}
          />
          <img
            src={bigImg}
            alt=""
            style={{ width: '100px', height: '100px' }}
          />
        </div>
        <button
          onClick={() => {
            changeUserName('lizuncong')
            // confirm({
            //   title: 'Do you want to delete these items?',
            //   content: 'When clicked the OK button, this dialog will be closed after 1 second',
            //   onOk() {
            //     return new Promise((resolve, reject) => {
            //       setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            //     }).catch(() => console.log('Oops errors!'));
            //   },
            //   onCancel() {},
            // });
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
