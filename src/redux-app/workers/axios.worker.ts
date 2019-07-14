// DO NOT IMPORT THIS FILE!
// This defines the behaviors for a Web Worker, and its context is not the same as normal.
// Its global context is not `window`, and you cannot use it with normal code intended for
// the main thread.

import axios from 'axios';

const context: Worker = self as any;

context.onerror = (event) => {
    console.log('axios worker error', event);
};

context.onmessage = (event) => {
    console.log('axios worker rx', event);
    switch (event.data.type) {
        case 'AXIOS_GET':
            axios.get(event.data.body.url).then(
                r => {
                    console.log('axios worker tx', { body: r, type: 'AXIOS_GET_SUCCESS' });
                    context.postMessage({ body: r.data, type: 'AXIOS_GET_SUCCESS' });
                },
                r => {
                    console.log('axios worker tx', { body: r, type: 'AXIOS_GET_FAILURE' });
                    context.postMessage({ body: r, type: 'AXIOS_GET_FAILURE' });
                }
            ).catch(
                e => {
                    console.log('axios worker tx', { body: e, type: 'AXIOS_GET_CATCH' });
                    context.postMessage({ body: e, type: 'AXIOS_GET_CATCH' });
                }
            );
            break;
        default:
            const tx = event.data;
            console.log('axios worker tx', tx);
            context.postMessage(tx);
            break;
    }
};
