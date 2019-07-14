import './declarations.d.ts';
import _AxiosWorker = require('./axios.worker.ts');
import _EchoWorker = require('./echo.worker.ts');

// These are the *only* things that window-based application modules should import. They
// do not behave as you might expect. They only work because webpack transforms each of
// these values into a convenient worker factory with the correct URL embedded into its
// logic to save you the trouble of figuring out the URL string yourself.
//
// As result, you can do this:
// ```javascript
// import { ExampleWorker } from '../workers';
// const exampleWorker = new ExampleWorker();
// ```
//
// Whereas without using webpack you would have to do this:
// ```javascript
// var workerUrl = figureOutWorkerUrl();
// var exampleWorker = new Worker(workerUrl);
// ```
export const AxiosWorker = _AxiosWorker;
export const EchoWorker = _EchoWorker;
