import axios from 'axios';
import { Dispatch } from 'redux';

import { useAxiosWorker } from '../workers/useAxiosWorker';

// =======================================================================================
// INDEX_USERS
// =======================================================================================
// actions
export const INDEX_USERS_PENDING = 'INDEX_USERS_PENDING';
export const INDEX_USERS_SUCCESS = 'INDEX_USERS_SUCCESS';
export const INDEX_USERS_FAILURE = 'INDEX_USERS_FAILURE';
// action generators
export const indexUsersPending = () => ({ type: INDEX_USERS_PENDING });
export const indexUsersSuccess = (data: object) => ({ type: INDEX_USERS_SUCCESS, data });
export const indexUsersFailure = (data: string) => ({ type: INDEX_USERS_FAILURE, data });
// action coordinator (returns a function that accepts `dispatch` as a parameter)
export function indexUsers() {
    return (dispatch: Dispatch) => {
        dispatch(indexUsersPending());
        return axios.get('http://localhost:3000/api/users').then(
            r => dispatch(indexUsersSuccess(r.data)),
            r => dispatch(indexUsersFailure(r))
        ).catch(
            e => dispatch(indexUsersFailure(e))
        );
    };
}

// =======================================================================================
// INDEX_USERS_WITH_WORKER
// =======================================================================================
// actions
export const INDEX_USERS_WITH_WORKER_PENDING = 'INDEX_USERS_WITH_WORKER_PENDING';
export const INDEX_USERS_WITH_WORKER_SUCCESS = 'INDEX_USERS_WITH_WORKER_SUCCESS';
export const INDEX_USERS_WITH_WORKER_FAILURE = 'INDEX_USERS_WITH_WORKER_FAILURE';
// action generators
export const indexUsersWithWorkerPending = () => ({ type: INDEX_USERS_WITH_WORKER_PENDING });
export const indexUsersWithWorkerSuccess = (data: object) => ({ type: INDEX_USERS_WITH_WORKER_SUCCESS, data });
export const indexUsersWithWorkerFailure = (data: string) => ({ type: INDEX_USERS_WITH_WORKER_FAILURE, data });
// action coordinator (returns a function that accepts `dispatch` as a parameter)
export function indexUsersWithWorker() {
    return (dispatch: Dispatch) => {
        dispatch(indexUsersWithWorkerPending());
        return useAxiosWorker({ method: 'GET', url: 'http://localhost:3000/api/users' }).then(
            (r: any) => dispatch(indexUsersWithWorkerSuccess(r.data.body)),
            r => dispatch(indexUsersWithWorkerFailure(r))
        ).catch(
            e => dispatch(indexUsersWithWorkerFailure(e))
        );
    };
}
