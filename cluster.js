const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

var workers = [];

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        workers.push(cluster.fork());

        workers[i].on('message', function(message) {
          console.log(message);
        });
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
      });
}
else {
    console.log(`Worker ${process.pid} started...`);
    
    require('./main.js')();
}