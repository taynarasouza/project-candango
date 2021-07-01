import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import markers from './markers/reducer';
import circuits from './circuits/reducer';

export default combineReducers({
  auth,
  user,
  markers,
  circuits
});
