import { changeUserAction, changeListAction } from './actionTypes'

export const changeUserName = (userName) => {
  return dispatch => {
    dispatch(changeUserAction(userName))
  }
}

export const getList = () => {
  return (dispatch, getState, axios) => {
    return axios.get('/api/news.json?secret=PP87ANTIPIRATE')
        .then(res => {
          const list = res.data.data
          console.log('home...action.js....getList', list)
          dispatch(changeListAction(list))
        })
  }
}
