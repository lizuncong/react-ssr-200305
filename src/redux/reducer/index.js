import { combineReducers } from 'redux';
import login from '../../pages/login/reduce';
import home from '../../pages/home/reduce';

export default combineReducers({
  user: login,
  home,
});
