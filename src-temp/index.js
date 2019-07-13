import Worker from './worker.js';

const w = new Worker();

w.onerror = (event) => {
    console.log('main error', event);
};

w.onmessage = (event) => {
    console.log('main Rx', event);
};

window.onclick = (_event) => {
    const tx = Math.random();
    console.log('main Tx', tx, w);
    w.postMessage(tx);
};
