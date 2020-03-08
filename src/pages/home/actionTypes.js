export const CHANGE_USER = 'HOME/CHANGE_USER';
export const CHANGE_LIST= 'HOME/CHANGE_List';
export const changeListAction = (list) => ({
  type: CHANGE_LIST,
  payload: list
})

export const changeUserAction = (userName) => ({
  type: CHANGE_USER,
  payload: userName
})