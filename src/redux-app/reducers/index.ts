import { combineReducers } from 'redux';

import {
    INDEX_USERS_PENDING,
    INDEX_USERS_SUCCESS,
    INDEX_USERS_FAILURE,
} from '../actions';


export interface IUser {
    id: number | string;
    first_name: string;
    last_name: string;
    email_address: string;
    company_name: string;
    image_url: string;
}

function transformUsers(users: IUser[]): IUser[] {
    return users.map(user => ({
        id: user.id,
        first_name: user.first_name.split('').reverse().join(''),
        last_name: user.last_name.split('').reverse().join(''),
        email_address: user.email_address.split('').reverse().join(''),
        company_name: user.company_name.split('').reverse().join(''),
        image_url: user.image_url,
    }));
}


interface IUsersState {
    data?: { users: IUser[]; };
    error?: boolean;
}
interface IIndexUsersPendingAction {
    type: typeof INDEX_USERS_PENDING;
}
interface IIndexUsersSuccessAction {
    data: { users: IUser[]; };
    type: typeof INDEX_USERS_SUCCESS;
}
interface IIndexUsersFailureAction {
    type: typeof INDEX_USERS_FAILURE;
}
type TUsersActionTypes = IIndexUsersPendingAction | IIndexUsersSuccessAction | IIndexUsersFailureAction;

function users(state: IUsersState = {}, action: TUsersActionTypes): IUsersState {
    switch (action.type) {
        case INDEX_USERS_PENDING:
            return { ...state, error: undefined };
        case INDEX_USERS_SUCCESS:
            return {
                ...state,
                data: {
                    ...action.data,
                    users: (
                        Math.floor(Math.random() * Math.floor(2)) // coin flip
                        ? transformUsers(action.data.users)
                        : action.data.users
                    ),
                },
                error: undefined,
            };
        case INDEX_USERS_FAILURE:
            return { ...state, error: true };
        default:
            return state;
    }
}


export default combineReducers({
    users,
});
