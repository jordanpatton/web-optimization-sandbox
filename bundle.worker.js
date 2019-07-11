if (typeof postMessage !== 'undefined') {
    console.log('bundle.worker.js');
    onmessage = function (_event) {
        const data = Date.now();
        console.log('worker.js:onmessage', data);
        postMessage(data);
    };
}
