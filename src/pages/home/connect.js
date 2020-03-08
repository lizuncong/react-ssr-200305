import { connect } from 'react-redux';
import { changeUserName, getList } from './actions';
import Home from './index';

const mapStateToProps = (state) => {
  console.log('home...connect.js', state)
  const { home } = state;
  return {
    userName: home.userName,
    list: home.list
  }
}

const mapDispatchToProps = dispatch => ({
  changeUserName: (userName) => dispatch(changeUserName(userName)),
  getList: () => dispatch(getList()),
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
