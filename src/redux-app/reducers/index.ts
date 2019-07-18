import { combineReducers } from 'redux';

import { observations } from './observations';
import { users } from './users';

export default combineReducers({
    observations,
    users,
});
