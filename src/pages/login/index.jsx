import React from 'react'

class Login extends React.Component{

  componentDidMount() {
    console.log('login...componentDidMount')
  }

  render(){
    const { userName } = this.props;
    return (
        <div>
          <div>登录页</div>
        </div>
    )
  }
}

export default Login
