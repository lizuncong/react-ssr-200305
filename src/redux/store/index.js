import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from '../reducer';


// 安装redux-devtools-extension的可视化工具。
// import { composeWithDevTools } from 'redux-devtools-extension'
// const initialState = {
//   menuName: ''
// }
// const configureStore = () => createStore(reducer, initialState);


const getStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
}

export default getStore
