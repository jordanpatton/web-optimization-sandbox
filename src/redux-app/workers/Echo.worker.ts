const context: Worker = self as any;

context.onmessage = function (event) {
    console.log('worker:onmessage Rx', event.data);
    var message = event.data;
    console.log('worker:onmessage Tx', message);
    postMessage(message, '*');
};

export default context;
