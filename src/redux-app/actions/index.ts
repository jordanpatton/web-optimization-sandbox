import { Dispatch } from 'redux';

export function fetchResource(resourceName: string = ''): Promise<any> {
    return (
        (typeof window !== 'undefined' && typeof window.fetch !== 'undefined')
        ? window
            .fetch(`http://localhost:3000/api/${resourceName}`, { method: 'GET' })
            .then(r => r.status === 200 ? r.json() : Promise.reject(r))
        : Promise.reject('window.fetch unavailable')
    );
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
export function indexUsers() {
    return (dispatch: Dispatch) => {
        dispatch(indexUsersPending());
        return fetchResource('users')
            .then(responseJson => dispatch(indexUsersSuccess(responseJson)))
            .catch(() => dispatch(indexUsersFailure('FAILURE!')));
    };
}
