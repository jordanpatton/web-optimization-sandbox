import axios from 'axios';
import { Dispatch } from 'redux';

import { AxiosWorker } from '../workers';

function indexUsersWithWorker(dispatch: Dispatch) {
    // prepare worker
    const axiosWorker = new AxiosWorker();
    axiosWorker.onerror = (event) => {
        console.log('main error', event);
        axiosWorker.terminate();
    };
    axiosWorker.onmessage = (event) => {
        console.log('main rx', event);
        axiosWorker.terminate();
    };
    // transmit message
    const message = {
        body: { url: 'http://localhost:3000/api/users' },
        type: 'AXIOS_GET',
    };
    console.log('main tx', message);
    axiosWorker.postMessage(message);
}

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
            indexUsersWithWorker(dispatch);
            return axios.get('http://localhost:3000/api/users')
                .then(responseJson => dispatch(indexUsersSuccess(responseJson.data)))
                .catch(() => dispatch(indexUsersFailure('FAILURE!')));
        }
        // else
        return axios.get('http://localhost:3000/api/users')
            .then(responseJson => dispatch(indexUsersSuccess(responseJson.data)))
            .catch(() => dispatch(indexUsersFailure('FAILURE!')));
    };
}
