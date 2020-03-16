import { combineReducers } from 'redux';
import home from '../../pages/home/reduce';
import login from '../../pages/login/reduce'

export default combineReducers({
  home,
  login
});
