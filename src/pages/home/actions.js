import { changeUserAction, changeListAction } from './actionTypes'

export const changeUserName = (userName) => {
  return dispatch => {
    dispatch(changeUserAction(userName))
  }
}

export const getList = () => {
  return (dispatch, getState, axios) => {
    return axios.get('/api')
        .then(res => {
          const list = res.data
          dispatch(changeListAction(list))
        })
  }
}
