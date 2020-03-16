import { connect } from 'react-redux';
import { changeUserName, getList } from './actions';
import Home from './index';

const mapStateToProps = (state) => {
  const { home } = state;
  return {
    userName: home.userName,
    list: home.list
  }
}

const mapDispatchToProps = dispatch => ({
  changeUserName: (userName) => dispatch(changeUserName(userName)),
  getList: () => dispatch(getList()),
})
const ConnectHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectHome
