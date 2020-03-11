import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from '../reducer';
import  { clientAxios, serverAxios } from '../../request'

// 安装redux-devtools-extension的可视化工具。
// import { composeWithDevTools } from 'redux-devtools-extension'
// const initialState = {
//   menuName: ''
// }
// const configureStore = () => createStore(reducer, initialState);


export const getServerStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(serverAxios)));
}

export const getClientStore = () => {
  const initiallState = window.INITIAL_STATE;
  return createStore(rootReducer, initiallState, applyMiddleware(thunk.withExtraArgument(clientAxios)));
}
