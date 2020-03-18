import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducer';
import { clientAxios, serverAxios } from '../../request';


export const getServerStore = (req) => createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(serverAxios(req))),
);

export const getClientStore = () => {
  const initiallState = window.INITIAL_STATE;
  return createStore(
    rootReducer,
    initiallState,
    applyMiddleware(thunk.withExtraArgument(clientAxios)),
  );
};
