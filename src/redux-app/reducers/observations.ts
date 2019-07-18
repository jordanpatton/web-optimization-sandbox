import {
    INDEX_OBSERVATIONS_PENDING,
    INDEX_OBSERVATIONS_SUCCESS,
    INDEX_OBSERVATIONS_FAILURE,
} from '../actions/observations';
import {
    INDEX_OBSERVATIONS_WITH_WORKER_PENDING,
    INDEX_OBSERVATIONS_WITH_WORKER_SUCCESS,
    INDEX_OBSERVATIONS_WITH_WORKER_FAILURE,
} from '../actions/observationsWithWorker';
import { IObservation } from '../types';

interface IObservationsState {
    data?: { observations: IObservation[]; };
    error?: boolean;
}
interface IIndexObservationsPendingAction {
    type: typeof INDEX_OBSERVATIONS_PENDING;
}
interface IIndexObservationsSuccessAction {
    data: { observations: IObservation[]; };
    type: typeof INDEX_OBSERVATIONS_SUCCESS;
}
interface IIndexObservationsFailureAction {
    type: typeof INDEX_OBSERVATIONS_FAILURE;
}
interface IIndexObservationsWithWorkerPendingAction {
    type: typeof INDEX_OBSERVATIONS_WITH_WORKER_PENDING;
}
interface IIndexObservationsWithWorkerSuccessAction {
    data: { observations: IObservation[]; };
    type: typeof INDEX_OBSERVATIONS_WITH_WORKER_SUCCESS;
}
interface IIndexObservationsWithWorkerFailureAction {
    type: typeof INDEX_OBSERVATIONS_WITH_WORKER_FAILURE;
}
type TObservationsActionTypes = (
    IIndexObservationsPendingAction |
    IIndexObservationsSuccessAction |
    IIndexObservationsFailureAction |
    IIndexObservationsWithWorkerPendingAction |
    IIndexObservationsWithWorkerSuccessAction |
    IIndexObservationsWithWorkerFailureAction
);

export function observations(state: IObservationsState = {}, action: TObservationsActionTypes): IObservationsState {
    switch (action.type) {
        case INDEX_OBSERVATIONS_PENDING:
        case INDEX_OBSERVATIONS_WITH_WORKER_PENDING:
            return { ...state, error: undefined };
        case INDEX_OBSERVATIONS_SUCCESS:
        case INDEX_OBSERVATIONS_WITH_WORKER_SUCCESS:
            return {
                ...state,
                data: { ...action.data, observations: action.data.observations },
                error: undefined,
            };
        case INDEX_OBSERVATIONS_FAILURE:
        case INDEX_OBSERVATIONS_WITH_WORKER_FAILURE:
            return { ...state, error: true };
        default:
            return state;
    }
}
