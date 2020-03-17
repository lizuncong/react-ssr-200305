import { changeMoreValueAction } from './actionCreators';


export const changeMoreValue = (data) => (dispatch) => {
  dispatch(changeMoreValueAction(data));
};


export const getUserInfo = () => (dispatch, getState, axios) => axios.get('api/userInfo').then((res) => {
  const { data } = res;
  console.log('getUserInfo...', data)
  dispatch(changeMoreValue({
    isLogin: data,
  }));
});
