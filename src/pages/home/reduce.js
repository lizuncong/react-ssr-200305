import { CHANGE_USER, CHANGE_LIST, CHANGE_MORE_VALUE } from './actionTypes'

let count = 0
const defaultState = {
  userName: '计数器',
  count: 0,
  list: [],
}

export default function(state = defaultState, action){
  switch (action.type) {
    case CHANGE_USER:
      console.log('home...reduce.js', action)
      count += 1
      return { ...state, userName: action.payload + count}
    case CHANGE_LIST:
      return { ...state, list: action.payload }
    case CHANGE_MORE_VALUE:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}
