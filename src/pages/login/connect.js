import { connect } from 'react-redux';
import { changeMoreValue } from './actions';
import Login from './index.jsx';

const mapStateToProps = (state) => {
  const { login } = state;
  return {
    isLogin: login.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeMoreValue: (data) => dispatch(changeMoreValue(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
