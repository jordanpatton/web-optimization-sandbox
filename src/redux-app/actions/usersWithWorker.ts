import { Dispatch } from 'redux';

import { IApiUsersResponse, IUser } from '../types';
import { useAxiosWorker } from '../workers/useAxiosWorker';
import { useTransformUsersWorker } from '../workers/useTransformUsersWorker';

// actions
export const INDEX_USERS_WITH_WORKER_PENDING = 'INDEX_USERS_WITH_WORKER_PENDING';
export const INDEX_USERS_WITH_WORKER_SUCCESS = 'INDEX_USERS_WITH_WORKER_SUCCESS';
export const INDEX_USERS_WITH_WORKER_FAILURE = 'INDEX_USERS_WITH_WORKER_FAILURE';

// action generators
export const indexUsersWithWorkerPending = () => ({ type: INDEX_USERS_WITH_WORKER_PENDING });
export const indexUsersWithWorkerSuccess = (data: { users: IUser[] }) => ({ type: INDEX_USERS_WITH_WORKER_SUCCESS, data });
export const indexUsersWithWorkerFailure = (data: string) => ({ type: INDEX_USERS_WITH_WORKER_FAILURE, data });

// action coordinator (returns a function that accepts `dispatch` as a parameter)
export function indexUsersWithWorker() {
    return (dispatch: Dispatch) => {
        dispatch(indexUsersWithWorkerPending());
        return useAxiosWorker({ method: 'GET', url: 'http://localhost:3000/api/users' }).then(
            (r1: { data: { body: IApiUsersResponse } }) => {
                return useTransformUsersWorker((r1.data.body as IApiUsersResponse).users).then(
                    (r2: { data: { body: IUser[] } }) => {
                        return dispatch(indexUsersWithWorkerSuccess({ users: r2.data.body }));
                    },
                    r2 => dispatch(indexUsersWithWorkerFailure(r2))
                ).catch(
                    e2 => dispatch(indexUsersWithWorkerFailure(e2))
                );
            },
            r1 => dispatch(indexUsersWithWorkerFailure(r1))
        ).catch(
            e1 => dispatch(indexUsersWithWorkerFailure(e1))
        );
    };
}
