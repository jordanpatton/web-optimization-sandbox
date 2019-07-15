import { Dispatch } from 'redux';

import { useAxiosWorker } from '../workers/useAxiosWorker';
import { useTransformUsersWorker } from '../workers/useTransformUsersWorker';

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
            (r1: any) => {
                console.log('~~~~~~~~~~~~~~~');
                console.log(r1.data.body);
                console.log(useTransformUsersWorker);
                console.log('~~~~~~~~~~~~~~~');
                // return useTransformUsersWorker(r1.data.body.users).then(
                //     (r2: any) => dispatch(indexUsersWithWorkerSuccess(r2.data.body)),
                //     r2 => dispatch(indexUsersWithWorkerFailure(r2))
                // ).catch(
                //     e2 => dispatch(indexUsersWithWorkerFailure(e2))
                // );
                useTransformUsersWorker(r1.data.body.users).then(
                    r2 => console.log('SUCCESS', r2),
                    r2 => console.log('FAILURE', r2)
                ).catch(
                    e2 => console.log('CATCH', e2)
                );
                return dispatch(indexUsersWithWorkerSuccess(r1.data.body));
            },
            r1 => dispatch(indexUsersWithWorkerFailure(r1))
        ).catch(
            e1 => dispatch(indexUsersWithWorkerFailure(e1))
        );
    };
}
