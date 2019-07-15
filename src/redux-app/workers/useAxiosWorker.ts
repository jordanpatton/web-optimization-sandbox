import { AxiosRequestConfig } from 'axios';

import './declarations.d.ts';
import AxiosWorker = require('./axios.worker.ts');

/**
 * Uses AxiosWorker and returns a Promise with the result.
 *
 * This is the only part of axios worker that window-based application modules should
 * import. It wraps the webpack-managed factory and promisifies the event-driven API.
 */
export const useAxiosWorker = (axiosRequestConfig: AxiosRequestConfig) => {
    return new Promise((resolve, reject) => {
        // create new worker
        const worker = new AxiosWorker();
        // attach main-thread error handler
        worker.onerror = (event) => {
            console.log('useAxiosWorker error', event);
            reject(event);
            worker.terminate();
        };
        // attach main-thread message handler
        worker.onmessage = (event) => {
            console.log('useAxiosWorker rx', event);
            if (event.data.type === 'SUCCESS') {
                resolve(event);
            } else {
                reject(event);
            }
            worker.terminate();
        };
        // transmit message to worker
        console.log('useAxiosWorker tx', axiosRequestConfig);
        worker.postMessage(axiosRequestConfig);
    });
};
