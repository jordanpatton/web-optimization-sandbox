import { combineReducers } from 'redux';

import {
    INDEX_USERS_PENDING,
    INDEX_USERS_SUCCESS,
    INDEX_USERS_FAILURE,
} from '../actions';


interface User {
    id: number | string;
    first_name: string;
    last_name: string;
    email_address: string;
    company_name: string;
    image_url: string;
}
interface UsersState {
    data?: any[],
    error?: boolean,
}
interface IndexUsersPendingAction {
    data: any[],
    type: typeof INDEX_USERS_PENDING,
}
interface IndexUsersSuccessAction {
    data: any[],
    type: typeof INDEX_USERS_SUCCESS,
}
interface IndexUsersFailureAction {
    data: any[],
    type: typeof INDEX_USERS_FAILURE,
}
type UsersActionTypes = IndexUsersPendingAction | IndexUsersSuccessAction | IndexUsersFailureAction;

function users(state: UsersState = {}, action: UsersActionTypes): UsersState {
    switch (action.type) {
        case INDEX_USERS_PENDING:
            return { ...state, error: undefined };
        case INDEX_USERS_SUCCESS:
            console.log(action);
            return { ...state, data: action.data, error: undefined };
        case INDEX_USERS_FAILURE:
            return { ...state, error: true };
        default:
            return state;
    }
}


export default combineReducers({
    users,
});
