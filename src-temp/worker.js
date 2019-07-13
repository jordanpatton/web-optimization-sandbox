onerror = (event) => {
    console.log('worker error', event);
};

onmessage = (event) => {
    console.log('worker Rx', event);
    const tx = Math.random();
    console.log('worker Tx', tx);
    postMessage(tx);
};
