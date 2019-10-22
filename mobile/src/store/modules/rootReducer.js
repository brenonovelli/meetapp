import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import registrations from './registration/reducer';

export default combineReducers({
  auth,
  user,
  registrations,
});
