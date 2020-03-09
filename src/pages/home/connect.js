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
})
const ConnectHome = connect(mapStateToProps, mapDispatchToProps)(Home);

// 在服务端渲染之前，把路由需要的数据提前加载好
ConnectHome.loadData = (store) => {
  return store.dispatch(getList())
}

export default ConnectHome
