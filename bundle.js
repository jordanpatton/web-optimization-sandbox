(function() {
    if (typeof window !== 'undefined' && typeof window.Worker !== 'undefined') {
        // https://stackoverflow.com/questions/21408510/chrome-cant-load-web-worker
        var bundleWorker = new Worker(
            URL.createObjectURL(
                new Blob(
                    ['('+bundleWorkerJs.toString()+')()'],
                    {type: 'text/javascript'}
                )
            )
        );

        var bundleWorkerButton = document.getElementById('bundleWorkerButton');
        bundleWorkerButton.onclick = function (_event) {
            console.log('click', bundleWorker);
        };
    }
})()
