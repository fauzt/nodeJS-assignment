const {parentPort} = require('worker_threads');
const myAddon = require('bindings')('myaddon');

parentPort.on('message', (inputData) => {
    const result = myAddon.pyWrapped(inputData[0], inputData[1], inputData[2]);
    parentPort.postMessage(result);
});