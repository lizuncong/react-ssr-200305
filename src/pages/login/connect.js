import { connect } from 'react-redux';
import { changeMoreValue } from './actions';
import Login from './index';

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    isLogin: user.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeMoreValue: (data) => dispatch(changeMoreValue(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
