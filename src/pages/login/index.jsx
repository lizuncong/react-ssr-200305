import React from 'react'

class Login extends React.Component{

  componentDidMount() {

  }

  render(){
    const { userName } = this.props;
    return (
        <div>
          <div>This is login page !!!</div>
          <div>This is my name: {userName}</div>
        </div>
    )
  }
}

export default Login
