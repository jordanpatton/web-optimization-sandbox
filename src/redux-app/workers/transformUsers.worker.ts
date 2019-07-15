// DO NOT IMPORT THIS FILE!
// This file defines behaviors for a Web Worker, and its context is not `window`. Do not
// attempt to use it with `window`-based application code intended for the main thread.

import { IUser } from '../reducers/users';
import { transformUsers } from '../transformers';

const context: Worker = self as any;

context.onerror = (event) => {
    console.log('transformUsers worker error', { body: event, type: 'ERROR' });
    context.postMessage({ body: event, type: 'ERROR' });
};

context.onmessage = (event) => {
    console.log('transformUsers worker rx', event);
    try {
        const result = transformUsers(event.data.body.users as IUser[]);
        console.log('transformUsers worker tx', { body: result, type: 'SUCCESS' });
        context.postMessage({ body: result, type: 'SUCCESS' });
    } catch (error) {
        console.log('transformUsers worker tx', { body: error, type: 'CATCH' });
        context.postMessage({ body: error, type: 'CATCH' });
    }
};
