import React from 'react'

class Login extends React.Component{

  componentDidMount() {

  }

  render(){
    const { userName } = this.props;
    return (
        <div>
          <div>登录页</div>
          <div>欢迎： {userName}</div>
        </div>
    )
  }
}

export default Login
