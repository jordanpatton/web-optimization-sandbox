(function() {
    console.log('bundle.js');
    if (typeof window !== 'undefined' && typeof window.Worker !== 'undefined') {
        var bundleWorker = new Worker('bundle.worker.js');
        var bundleWorkerButton = document.getElementById('bundleWorkerButton');
        bundleWorkerButton.onclick = function (_event) {
            console.log('click', bundleWorker);
        };
    }
})()
