// DO NOT IMPORT THIS FILE!
// This declares module types for a Web Worker, and its context is not the same as normal.
// Its global context is not `window`, and you cannot use it with normal code intended for
// the main thread.

declare module '*.worker.ts' {
    class WebpackWorker extends Worker {
        constructor();
    }

    export = WebpackWorker;
}
