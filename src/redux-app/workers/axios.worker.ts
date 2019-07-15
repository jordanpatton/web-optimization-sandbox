// DO NOT IMPORT THIS FILE!
// This file defines behaviors for a Web Worker, and its context is not `window`. Do not
// attempt to use it with `window`-based application code intended for the main thread.

import axios, { AxiosRequestConfig } from 'axios';

const context: Worker = self as any;

context.onerror = (event) => {
    console.log('axios worker error', { body: event, type: 'ERROR' });
    context.postMessage({ body: event, type: 'ERROR' });
};

context.onmessage = (event) => {
    console.log('axios worker rx', event);
    axios(event.data.body.axiosRequestConfig as AxiosRequestConfig).then(
        r => {
            console.log('axios worker tx', { body: r.data, type: 'SUCCESS' });
            context.postMessage({ body: r.data, type: 'SUCCESS' });
        },
        r => {
            console.log('axios worker tx', { body: r, type: 'FAILURE' });
            context.postMessage({ body: r, type: 'FAILURE' });
        }
    ).catch(
        e => {
            console.log('axios worker tx', { body: e, type: 'CATCH' });
            context.postMessage({ body: e, type: 'CATCH' });
        }
    );
};
