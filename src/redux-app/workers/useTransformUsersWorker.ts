import { IUser } from '../types';

import './declarations.d.ts';
import TransformUsersWorker = require('./transformUsers.worker.ts');

/**
 * Uses TransformUsersWorker and returns a Promise with the result.
 *
 * This is the only part of this Web Worker that window-based application modules should
 * import. It wraps the webpack-managed factory and promisifies the event-driven API.
 */
export const useTransformUsersWorker = (users: IUser[]) => {
    return new Promise((resolve, reject) => {
        // create new worker
        const worker = new TransformUsersWorker();
        // attach main-thread error handler
        worker.onerror = (event) => {
            console.log('useTransformUsersWorker error', event);
            reject(event);
            worker.terminate();
        };
        // attach main-thread message handler
        worker.onmessage = (event) => {
            console.log('useTransformUsersWorker rx', event);
            if (event.data.type === 'SUCCESS') {
                resolve(event);
            } else {
                reject(event);
            }
            worker.terminate();
        };
        // transmit message to worker
        const message = { body: { users } };
        console.log('useTransformUsersWorker tx', message);
        worker.postMessage(message);
    });
};
