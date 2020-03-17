export const CHANGE_USER = 'HOME/CHANGE_USER';
export const CHANGE_LIST = 'HOME/CHANGE_List';
export const CHANGE_MORE_VALUE = 'HOME/CHANGE_MORE_VALUE';

export const changeMoreValueAction = (data) => ({
  type: CHANGE_MORE_VALUE,
  payload: data,
});

export const changeListAction = (list) => ({
  type: CHANGE_LIST,
  payload: list,
});

export const changeUserAction = (userName) => ({
  type: CHANGE_USER,
  payload: userName,
});
