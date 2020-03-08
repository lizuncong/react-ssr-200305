import { CHANGE_USER, CHANGE_LIST } from './actionTypes'

let count = 0
const defaultState = {
  userName: 'lizuncong',
  list: [],
}

export default function(state = defaultState, action){
  switch (action.type) {
    case CHANGE_USER:
      console.log('home...reduce.js', action)
      count += 1
      return { ...state, userName: action.payload + count}
    case CHANGE_LIST:
      count += 1
      return { ...state, list: action.payload }
    default:
      return state;
  }
}