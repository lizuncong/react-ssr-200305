import { changeMoreValueAction } from './actionCreators';


export const changeMoreValue = (data) => (dispatch) => {
  dispatch(changeMoreValueAction(data));
};


export const getUserInfo = () => (dispatch, getState, axios) => axios.get('api/userInfo').then((res) => {
  const { data } = res;
  dispatch(changeMoreValue({
    isLogin: data,
  }));
});


export const handleLogin = () => (dispatch, getState, axios) => axios.get('api/login').then((res) => {
  const { data } = res;
  dispatch(changeMoreValue({
    isLogin: data,
  }));
});
