import React from 'react';
import { Button } from 'antd';
import styles from './index.module.less';

class Login extends React.Component {
  componentDidMount() {
  }

  render() {
    const { changeMoreValue, isLogin } = this.props;
    return (
      <div className={styles.pageContainer}>
        <div>登录页</div>
        <div>{ isLogin ? '已登录' : '未登录' }</div>
        <Button
          type="primary"
          onClick={() => {
            console.log('btn...click....')
            changeMoreValue({ isLogin: !isLogin });
          }}
        >
          登录
        </Button>
      </div>
    );
  }
}

export default Login;
