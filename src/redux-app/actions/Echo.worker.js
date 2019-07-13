onerror = (event) => {
    console.log('worker error', event);
};

onmessage = (event) => {
    console.log('worker rx', event);
    const tx = event.data;
    console.log('worker tx', tx);
    postMessage(tx);
};
