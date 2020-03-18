import { connect } from 'react-redux';
import { changeMoreValue, handleLogin } from './actions';
import Login from './index';

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    isLogin: user.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeMoreValue: (data) => dispatch(changeMoreValue(data)),
  handleLogin: () => dispatch(handleLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
