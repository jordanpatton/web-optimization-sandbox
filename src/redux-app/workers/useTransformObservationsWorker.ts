import { IApiObservationsResponse, IObservation } from '../types';

import './declarations.d.ts';
import TransformObservationsWorker = require('./transformObservations.worker.ts');

/**
 * Uses TransformObservationsWorker and returns a Promise with the result.
 *
 * This is the only part of this Web Worker that window-based application modules should
 * import. It wraps the webpack-managed factory and promisifies the event-driven API.
 */
export const useTransformObservationsWorker = (observations: IApiObservationsResponse['observations']) => {
    return new Promise((resolve, reject) => {
        // create new worker
        const worker = new TransformObservationsWorker();
        // attach main-thread error handler
        worker.onerror = (event) => {
            console.log('useTransformObservationsWorker error', event);
            reject(event);
            worker.terminate();
        };
        // attach main-thread message handler
        worker.onmessage = (event) => {
            console.log('useTransformObservationsWorker rx', event);
            if (event.data.type === 'SUCCESS') {
                resolve(event.data.body as IObservation[]);
            } else {
                reject(event);
            }
            worker.terminate();
        };
        // transmit message to worker
        const message = { body: { observations } };
        console.log('useTransformObservationsWorker tx', message);
        worker.postMessage(message);
    });
};
