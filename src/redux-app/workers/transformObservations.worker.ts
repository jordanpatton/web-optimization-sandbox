// DO NOT IMPORT THIS FILE!
// This file defines behaviors for a Web Worker, and its context is not `window`. Do not
// attempt to use it with `window`-based application code intended for the main thread.

import { transformObservations } from '../transformers';
import { IApiObservationsResponse } from '../types';

const context: Worker = self as any;

context.onerror = (event) => {
    console.log('transformObservations worker error', { body: event, type: 'ERROR' });
    context.postMessage({ body: event, type: 'ERROR' });
};

context.onmessage = (event) => {
    console.log('transformObservations worker rx', event);
    try {
        const result = transformObservations(event.data.body.observations as IApiObservationsResponse['observations']);
        console.log('transformObservations worker tx', { body: result, type: 'SUCCESS' });
        context.postMessage({ body: result, type: 'SUCCESS' });
    } catch (error) {
        console.log('transformObservations worker tx', { body: error, type: 'CATCH' });
        context.postMessage({ body: error, type: 'CATCH' });
    }
};
