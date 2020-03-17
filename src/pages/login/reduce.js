import { CHANGE_MORE_VALUE } from './actionTypes';

const defaultState = {
  isLogin: false,
};

export default function (state = defaultState, action) {
  console.log('login...reduce.js', state, action)
  switch (action.type) {
    case CHANGE_MORE_VALUE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
