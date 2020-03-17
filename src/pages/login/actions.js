import { changeMoreValueAction } from './actionCreators';


export const changeMoreValue = (data) => (dispatch) => {
  dispatch(changeMoreValueAction(data));
};
