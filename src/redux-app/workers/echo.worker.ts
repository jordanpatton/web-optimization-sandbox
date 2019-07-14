// DO NOT IMPORT THIS FILE!
// This defines the behaviors for a Web Worker, and its context is not the same as normal.
// Its global context is not `window`, and you cannot use it with normal code intended for
// the main thread.

const context: Worker = self as any;

context.onerror = (event) => {
    console.log('echo worker error', event);
};

context.onmessage = (event) => {
    console.log('echo worker rx', event);
    const tx = event.data;
    console.log('echo worker tx', tx);
    context.postMessage(tx);
};
