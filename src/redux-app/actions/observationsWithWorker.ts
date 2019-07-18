import { Dispatch } from 'redux';

import { IApiObservationsResponse, IObservation } from '../types';
import { useAxiosWorker } from '../workers/useAxiosWorker';
import { useTransformObservationsWorker } from '../workers/useTransformObservationsWorker';

// actions
export const INDEX_OBSERVATIONS_WITH_WORKER_PENDING = 'INDEX_OBSERVATIONS_WITH_WORKER_PENDING';
export const INDEX_OBSERVATIONS_WITH_WORKER_SUCCESS = 'INDEX_OBSERVATIONS_WITH_WORKER_SUCCESS';
export const INDEX_OBSERVATIONS_WITH_WORKER_FAILURE = 'INDEX_OBSERVATIONS_WITH_WORKER_FAILURE';

// action generators
export const indexObservationsWithWorkerPending = () => ({ type: INDEX_OBSERVATIONS_WITH_WORKER_PENDING });
export const indexObservationsWithWorkerSuccess = (data: { observations: IObservation[] }) => ({ type: INDEX_OBSERVATIONS_WITH_WORKER_SUCCESS, data });
export const indexObservationsWithWorkerFailure = (data: string) => ({ type: INDEX_OBSERVATIONS_WITH_WORKER_FAILURE, data });

// action coordinator (returns a function that accepts `dispatch` as a parameter)
export function indexObservationsWithWorker() {
    return (dispatch: Dispatch) => {
        dispatch(indexObservationsWithWorkerPending());
        return useAxiosWorker({ method: 'GET', url: 'http://localhost:3000/api/observations' }).then(
            (r1: IApiObservationsResponse) => {
                return useTransformObservationsWorker(r1.observations).then(
                    (r2: IObservation[]) => {
                        return dispatch(indexObservationsWithWorkerSuccess({ observations: r2 }));
                    },
                    r2 => dispatch(indexObservationsWithWorkerFailure(r2))
                ).catch(
                    e2 => dispatch(indexObservationsWithWorkerFailure(e2))
                );
            },
            r1 => dispatch(indexObservationsWithWorkerFailure(r1))
        ).catch(
            e1 => dispatch(indexObservationsWithWorkerFailure(e1))
        );
    };
}
