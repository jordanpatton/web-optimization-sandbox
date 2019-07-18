import './declarations.d.ts';
import EchoWorker = require('./echo.worker.ts');

/**
 * Uses EchoWorker and returns a Promise with the result.
 *
 * This is the only part of this Web Worker that window-based application modules should
 * import. It wraps the webpack-managed factory and promisifies the event-driven API.
 */
export const useEchoWorker = (input: any) => {
    return new Promise((resolve, reject) => {
        // create new worker
        const worker = new EchoWorker();
        // attach main-thread error handler
        worker.onerror = (event) => {
            console.log('useEchoWorker error', event);
            reject(event);
            worker.terminate();
        };
        // attach main-thread message handler
        worker.onmessage = (event) => {
            console.log('useEchoWorker rx', event);
            resolve(event.data as any);
            worker.terminate();
        };
        // transmit message to worker
        const message = input;
        console.log('useEchoWorker tx', message);
        worker.postMessage(message);
    });
};
