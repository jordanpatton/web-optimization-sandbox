// Wrap the normal worker code in a function to prevent it from automatically executing.
// This is because some browsers (Chrome) won't let you create a worker on your local
// file system with local file urls. Instead, we use a workaround.
// https://stackoverflow.com/questions/21408510/chrome-cant-load-web-worker
function bundleWorkerJs() {
    onmessage = function (event) {
        console.log('bundleWorkerJs:onmessage Rx', event.data);
        var message = Math.random();
        console.log('bundleWorkerJs:onmessage Tx', message);
        postMessage(message);
    };
}

// If this file is loaded in the window context, do not execute the function. If it is
// outside of the window context (in a Web Worker context), do execute the function.
if (self !== window) {
    bundleWorkerJs();
}
