import axios from 'axios';
import { Dispatch } from 'redux';

import * as EchoWorker from 'worker-loader!../workers/Echo.worker';

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
    console.log(EchoWorker);
    return (dispatch: Dispatch) => {
        dispatch(indexUsersPending());
        return axios.get('http://localhost:3000/api/users')
            .then(responseJson => dispatch(indexUsersSuccess(responseJson.data)))
            .catch(() => dispatch(indexUsersFailure('FAILURE!')));
    };
}
