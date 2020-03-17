import { changeUserAction, changeListAction, changeMoreValueAction } from './actionTypes';

export const changeUserName = (userName) => (dispatch) => {
  dispatch(changeUserAction(userName));
};

export const getList = () => (dispatch, getState, axios) => axios.get('/api/list')
  .then((res) => {
    const list = res.data;
    dispatch(changeListAction(list));
    dispatch(changeUserName('lzc'));
  });

export const changeMoreValue = (data) => (dispatch) => {
  dispatch(changeMoreValueAction(data));
};
