import { changeMoreValueAction } from './actionCreators'


export const changeMoreValue = (data) => {
  return dispatch => {
    dispatch(changeMoreValueAction(data))
  }
}
