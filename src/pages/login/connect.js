import { connect } from 'react-redux'
import Login from './index.jsx'

const mapStateToProps = (state) => {
  const { home } = state;
  return {
    userName: home.userName
  }
}

export default connect(mapStateToProps)(Login)