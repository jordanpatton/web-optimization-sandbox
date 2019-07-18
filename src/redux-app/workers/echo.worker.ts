// DO NOT IMPORT THIS FILE!
// This file defines behaviors for a Web Worker, and its context is not `window`. Do not
// attempt to use it with `window`-based application code intended for the main thread.

const context: Worker = self as any;

context.onerror = (event) => {
    console.log('echo worker error', event);
    context.postMessage(event);
};

context.onmessage = (event) => {
    console.log('echo worker rx', event);
    const message = event.data;
    console.log('echo worker tx', message);
    context.postMessage(message);
};
