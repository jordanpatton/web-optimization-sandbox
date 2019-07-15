import { combineReducers } from 'redux';

import { INDEX_USERS_PENDING, INDEX_USERS_SUCCESS, INDEX_USERS_FAILURE } from '../actions';
import { IUser, transformUsers } from '../transformers';


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
                    users: transformUsers(action.data.users),
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
