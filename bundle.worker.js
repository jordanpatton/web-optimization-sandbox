// https://stackoverflow.com/questions/21408510/chrome-cant-load-web-worker
function bundleWorkerJs() {
    onmessage = function (_event) {
        const data = Date.now();
        console.log('bundleWorkerJs:onmessage', data);
        postMessage(data);
    };
}

if (self !== window) {
    bundleWorkerJs();
}
