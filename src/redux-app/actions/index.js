import axios from 'axios';
import { Dispatch } from 'redux';

// @ts-ignore: web worker has no explicit exports
import EchoWorker from './Echo.worker.js';
const echoWorker = new EchoWorker();
echoWorker.onerror = (event) => { console.log('main error', event); };
echoWorker.onmessage = (event) => { console.log('main rx', event); };

// // =======================================================================================
// // INDEX_USERS
// // =======================================================================================
// // actions
// export const INDEX_USERS_PENDING = 'INDEX_USERS_PENDING';
// export const INDEX_USERS_SUCCESS = 'INDEX_USERS_SUCCESS';
// export const INDEX_USERS_FAILURE = 'INDEX_USERS_FAILURE';
// // action generators
// export const indexUsersPending = () => ({ type: INDEX_USERS_PENDING });
// export const indexUsersSuccess = (data: object) => ({ type: INDEX_USERS_SUCCESS, data });
// export const indexUsersFailure = (data: string) => ({ type: INDEX_USERS_FAILURE, data });
// // action coordinator (returns a function that accepts `dispatch` as a parameter)
// export function indexUsers() {
//     // // @ts-ignore: web worker
//     // console.log(w);
//     // // @ts-ignore: web worker
//     // console.log(new EchoWorker());
//     // // @ts-ignore: web worker
//     // (new EchoWorker).postMessage(Math.random());
//     // // @ts-ignore: web worker
//     // (new EchoWorker()).postMessage(Math.random());

//     return (dispatch: Dispatch) => {
//         dispatch(indexUsersPending());
//         return axios.get('http://localhost:3000/api/users')
//             .then(responseJson => dispatch(indexUsersSuccess(responseJson.data)))
//             .catch(() => dispatch(indexUsersFailure('FAILURE!')));
//     };
// }

// =======================================================================================
// INDEX_USERS
// =======================================================================================
// actions
export const INDEX_USERS_PENDING = 'INDEX_USERS_PENDING';
export const INDEX_USERS_SUCCESS = 'INDEX_USERS_SUCCESS';
export const INDEX_USERS_FAILURE = 'INDEX_USERS_FAILURE';
// action generators
export const indexUsersPending = () => ({ type: INDEX_USERS_PENDING });
export const indexUsersSuccess = (data) => ({ type: INDEX_USERS_SUCCESS, data });
export const indexUsersFailure = (data) => ({ type: INDEX_USERS_FAILURE, data });
// action coordinator (returns a function that accepts `dispatch` as a parameter)
export function indexUsers() {
    const tx = Math.random();
    console.log('main tx', tx);
    echoWorker.postMessage(tx);

    return (dispatch) => {
        dispatch(indexUsersPending());
        return axios.get('http://localhost:3000/api/users')
            .then(responseJson => dispatch(indexUsersSuccess(responseJson.data)))
            .catch(() => dispatch(indexUsersFailure('FAILURE!')));
    };
}
