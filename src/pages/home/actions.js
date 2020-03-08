import axios from 'axios'
import { changeUserAction, changeListAction } from './actionTypes'

export const changeUserName = (userName) => {
  console.log('home....actions.js..', userName)
  return dispatch => {
    dispatch(changeUserAction(userName))
  }
}

export const getList = () => {
  return (dispatch) => {
    axios.get('/api/list')
        .then(res => {
          const list = res.data.data
          console.log('home...action.js....getList', list)
          dispatch(changeListAction(list))
        })
  }
}