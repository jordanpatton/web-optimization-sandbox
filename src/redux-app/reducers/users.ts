import {
    INDEX_USERS_PENDING,
    INDEX_USERS_SUCCESS,
    INDEX_USERS_FAILURE,
} from '../actions/users';
import {
    INDEX_USERS_WITH_WORKER_PENDING,
    INDEX_USERS_WITH_WORKER_SUCCESS,
    INDEX_USERS_WITH_WORKER_FAILURE,
} from '../actions/usersWithWorker';
import { transformUsers } from '../transformers';

export interface IUser {
    id: number | string;
    first_name: string;
    last_name: string;
    email_address: string;
    company_name: string;
    image_url: string;
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
interface IIndexUsersWithWorkerPendingAction {
    type: typeof INDEX_USERS_WITH_WORKER_PENDING;
}
interface IIndexUsersWithWorkerSuccessAction {
    data: { users: IUser[]; };
    type: typeof INDEX_USERS_WITH_WORKER_SUCCESS;
}
interface IIndexUsersWithWorkerFailureAction {
    type: typeof INDEX_USERS_WITH_WORKER_FAILURE;
}
type TUsersActionTypes = (
    IIndexUsersPendingAction |
    IIndexUsersSuccessAction |
    IIndexUsersFailureAction |
    IIndexUsersWithWorkerPendingAction |
    IIndexUsersWithWorkerSuccessAction |
    IIndexUsersWithWorkerFailureAction
);

export function users(state: IUsersState = {}, action: TUsersActionTypes): IUsersState {
    switch (action.type) {
        case INDEX_USERS_PENDING:
        case INDEX_USERS_WITH_WORKER_PENDING:
            return { ...state, error: undefined };
        case INDEX_USERS_SUCCESS:
        case INDEX_USERS_WITH_WORKER_SUCCESS:
            return {
                ...state,
                data: {
                    ...action.data,
                    users: transformUsers(action.data.users),
                },
                error: undefined,
            };
        case INDEX_USERS_FAILURE:
        case INDEX_USERS_WITH_WORKER_FAILURE:
            return { ...state, error: true };
        default:
            return state;
    }
}
