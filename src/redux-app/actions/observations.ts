import axios from 'axios';
import { Dispatch } from 'redux';

import { transformObservations } from '../transformers';
import { IApiObservationsResponse, IObservation } from '../types';

// actions
export const INDEX_OBSERVATIONS_PENDING = 'INDEX_OBSERVATIONS_PENDING';
export const INDEX_OBSERVATIONS_SUCCESS = 'INDEX_OBSERVATIONS_SUCCESS';
export const INDEX_OBSERVATIONS_FAILURE = 'INDEX_OBSERVATIONS_FAILURE';

// action generators
export const indexObservationsPending = () => ({ type: INDEX_OBSERVATIONS_PENDING });
export const indexObservationsSuccess = (data: { observations: IObservation[] }) => ({ type: INDEX_OBSERVATIONS_SUCCESS, data });
export const indexObservationsFailure = (data: string) => ({ type: INDEX_OBSERVATIONS_FAILURE, data });

// action coordinator (returns a function that accepts `dispatch` as a parameter)
export function indexObservations() {
    return (dispatch: Dispatch) => {
        dispatch(indexObservationsPending());
        return axios.get('http://localhost:3000/api/observations').then(
            r => dispatch(indexObservationsSuccess({
                observations: transformObservations((r.data as IApiObservationsResponse).observations),
            })),
            r => dispatch(indexObservationsFailure(r))
        ).catch(
            e => dispatch(indexObservationsFailure(e))
        );
    };
}
