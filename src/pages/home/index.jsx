import React from 'react'
import withStyles from 'isomorphic-style-loader/withStyles'
import { Modal } from 'antd'
import styles from './index.module.less';
// const { confirm } = Modal;

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
                <div key={item.id}>{`测试数据${item.id}`}</div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Home)
