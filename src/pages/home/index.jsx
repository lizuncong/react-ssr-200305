import React from 'react';
// import withStyles from 'isomorphic-style-loader/withStyles'
import { Modal } from 'antd';
import styles from './index.module.less';
import elephant from '../../resource/images/elephant.jpg';
import bigImg from '../../resource/images/big.png';

class Home extends React.Component {
  componentDidMount() {
    console.log('homfdfasfedff');
    const { getList, list } = this.props;
    if (!list.length) {
      getList();
    }
  }


  render() {
    const {
      userName, list, changeUserName, changeMoreValue, count,
    } = this.props;
    return (
      <div className={styles.home}>
        <div className={styles.title}>
          This is home page !!!
          <div>
            计数器：
            {count}
          </div>
          <div
            onClick={() => {
              changeMoreValue({
                count: count + 1,
              });
            }}
          >
            Add
          </div>
          <div>
            这是一个
            {userName}
          </div>
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
            changeUserName('计数器');
          }}
        >
          click me
        </button>
        <input type="text" placeholder="请输入" />
        <div>
          {
            list.map((item) => (
              <div key={item.id}>{item.title}</div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Home;
