// https://stackoverflow.com/questions/21408510/chrome-cant-load-web-worker
function bundleWorkerJs() {
    onmessage = function (event) {
        console.log('bundleWorkerJs:onmessage Rx', event.data);
        var message = Math.random();
        console.log('bundleWorkerJs:onmessage Tx', message);
        postMessage(message);
    };
}

if (self !== window) {
    bundleWorkerJs();
}
