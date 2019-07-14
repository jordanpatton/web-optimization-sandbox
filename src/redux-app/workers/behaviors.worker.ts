const context: Worker = self as any;

context.onerror = (event) => {
    console.log('worker error', event);
};

context.onmessage = (event) => {
    console.log('worker rx', event);
    const tx = event.data;
    console.log('worker tx', tx);
    context.postMessage(tx);
};
