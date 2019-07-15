import axios from 'axios';
import { Dispatch } from 'redux';

import { AxiosWorker } from '../workers';

const indexUsersWithWorker = () => new Promise((resolve, reject) => {
    // prepare worker
    const axiosWorker = new AxiosWorker();
    axiosWorker.onerror = (event) => {
        console.log('indexUsersWithWorker error', event);
        reject(event);
        axiosWorker.terminate();
    };
    axiosWorker.onmessage = (event) => {
        console.log('indexUsersWithWorker rx', event);
        if (event.data.type === 'AXIOS_GET_SUCCESS') {
            resolve(event);
        } else {
            reject(event);
        }
        axiosWorker.terminate();
    };
    // transmit message
    const message = {
        body: { url: 'http://localhost:3000/api/users' },
        type: 'AXIOS_GET',
    };
    console.log('indexUsersWithWorker tx', message);
    axiosWorker.postMessage(message);
});

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
export function indexUsers(shouldUseWorker: boolean = false) {
    return (dispatch: Dispatch) => {
        dispatch(indexUsersPending());
        if (shouldUseWorker) {
            return indexUsersWithWorker().then(
                (r: any) => dispatch(indexUsersSuccess(r.data.body)),
                r => dispatch(indexUsersFailure(r))
            ).catch(
                e => dispatch(indexUsersFailure(e))
            );
        }
        // else
        return axios.get('http://localhost:3000/api/users').then(
            r => dispatch(indexUsersSuccess(r.data)),
            r => dispatch(indexUsersFailure(r))
        ).catch(
            e => dispatch(indexUsersFailure(e))
        );
    };
}
