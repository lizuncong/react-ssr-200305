import { changeUserAction, changeListAction, changeMoreValueAction } from './actionTypes';

export const changeUserName = (userName) => (dispatch) => {
  dispatch(changeUserAction(userName));
};

export const getList = () => (dispatch, getState, axios) => axios.get('/api')
  .then((res) => {
    const list = res.data;
    dispatch(changeListAction(list));
  });

export const changeMoreValue = (data) => (dispatch) => {
  dispatch(changeMoreValueAction(data));
};
