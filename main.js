//var appmetrics = require('appmetrics');
//var monitoring = appmetrics.monitor();
const fs = require('fs');
const http = require('http');
const {Worker, isMainThread, parentPort} = require('worker_threads');
var myAddon = require('bindings')('myaddon');

const filepath = "py/mult.py";
const log_file = "metric.txt"
const port_number = 8080;

//var cpu_usage;
//monitoring.on('cpu', function (cpu) {
//  cpu_usage = cpu.process;
//});

var cpu_before;
var time_before;

const workerPool = [  // Start a pool of two workers
  new Worker('./addon.js'),
  new Worker('./addon.js')
];
const waiting = [];

console.log("Program started")


function startServer() {
  const server = http.createServer((req, res) => {
    var result;

    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      var x = Math.floor((Math.random() * 100) + 1);  //get randomised inputs
      var y = Math.floor((Math.random() * 100) + 1);

      res.writeHead(200);
    if (workerPool.length > 0) {
      cpu_before = process.cpuUsage();
      time_before = process.uptime();
      handleRequests(res, [x, y, filepath], workerPool.shift());
    }
    else {
      waiting.push((worker) => handleRequests(res, [x, y, filepath], worker));
    }

    });

  });

  server.listen(port_number);
}

function handleRequests(res, inputData, worker) {
  worker.postMessage(inputData);
  worker.once('message', (result) => {
    var elapsed_time = process.uptime() - time_before;
    var mem = process.memoryUsage().heapUsed;
    var cpu_usage = process.cpuUsage(cpu_before);
    
    var txt = String("CPU Usage: " + cpu_usage.system + "(system) " + cpu_usage.user + "(user), Memory(bytes): " + mem + " Elapsed time(s): " + elapsed_time
              + " Python file path: " + filepath + "\n");

    fs.appendFile(log_file, txt, (err) => {
    if (err)
      console.log(err);
    });

    var res_txt = "Result:" + result;
    res.end(res_txt);
  });

  if (waiting.length > 0)
    waiting.shift()(worker);
  else
    workerPool.push(worker);
}

if(!module.parent) {
  startServer();
} else {
  module.exports = startServer;
}