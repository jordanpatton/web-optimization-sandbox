(function() {
    if (typeof window !== 'undefined' && typeof window.Worker !== 'undefined') {
        // Create a URL by converting the worker's logic to a string, evaluating it,
        // setting it up as a blob, and assigning a non-local URL to it. Then pass it to
        // the Worker constructor. This works around the local file system restriction.
        // https://stackoverflow.com/questions/21408510/chrome-cant-load-web-worker
        var bundleWorker = new Worker(
            URL.createObjectURL(
                new Blob(
                    ['('+bundleWorkerJs.toString()+')()'],
                    {type: 'text/javascript'}
                )
            )
        );

        bundleWorker.onmessage = function (event) {
            console.log('bundleJs:onmessage Rx', event.data);
        };

        var bundleWorkerButton = document.getElementById('bundleWorkerButton');
        bundleWorkerButton.onclick = function (_event) {
            var message = Math.random();
            console.log('bundleJs:onmessage Tx', message);
            bundleWorker.postMessage(message);
        };
    }
})()
