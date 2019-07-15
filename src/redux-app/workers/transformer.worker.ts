// DO NOT IMPORT THIS FILE!
// This file defines behaviors for a Web Worker, and its context is not `window`. Do not
// attempt to use it with `window`-based application code intended for the main thread.

import { IUser, transformUsers } from '../transformers';

const context: Worker = self as any;

context.onerror = (event) => {
    console.log('transformer worker error', event);
};

context.onmessage = (event) => {
    console.log('transformer worker rx', event);
    const result = transformUsers(event.data as IUser[]);
    console.log('transformer worker tx', result);
    context.postMessage(result);
};
