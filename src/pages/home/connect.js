import { connect } from 'react-redux';
import { changeUserName, getList, changeMoreValue } from './actions';
import Home from './index';

const mapStateToProps = (state) => {
  const { home } = state;
  return {
    userName: home.userName,
    list: home.list,
    count: home.count
  }
}

const mapDispatchToProps = dispatch => ({
  changeUserName: (userName) => dispatch(changeUserName(userName)),
  getList: () => dispatch(getList()),
  changeMoreValue: (data) => dispatch(changeMoreValue(data))
})
const ConnectHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectHome
