import { CHANGE_MORE_VALUE } from './actionTypes';

const defaultState = {
  isLogin: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case CHANGE_MORE_VALUE:
      return { ...state, ...action.payload };
    default:
      return defaultState;
  }
}
