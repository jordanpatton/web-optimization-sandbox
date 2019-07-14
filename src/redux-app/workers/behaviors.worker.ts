// onerror = (event) => {
//     console.log('worker error', event);
// };

// onmessage = (event) => {
//     console.log('worker rx', event);
//     const tx = event.data;
//     console.log('worker tx', tx);
//     // @ts-ignore
//     postMessage(tx);
// };

const ctx: Worker = self as any;

ctx.onerror = (event) => {
    console.log('worker error', event);
};

ctx.onmessage = (event) => {
    console.log('worker rx', event);
    const tx = event.data;
    console.log('worker tx', tx);
    // @ts-ignore
    ctx.postMessage(tx);
};
