//var appmetrics = require('appmetrics');
//var monitoring = appmetrics.monitor();
const fs = require('fs');
const http = require('http');
var myAddon = require('bindings')('myaddon');

const filepath = "py/mult.py";
const log_file = "metric.txt"
const port_number = 8080;

//var cpu_usage;
//monitoring.on('cpu', function (cpu) {
//  cpu_usage = cpu.process;
//});

console.log("Program started")

function startServer() {
  const server = http.createServer((req, res) => {
    var result;


    var x = Math.floor((Math.random() * 100) + 1);  //get randomised inputs
    var y = Math.floor((Math.random() * 100) + 1);

	  var cpu_before = process.cpuUsage();
    var time_before = process.uptime();
    result = myAddon.pyWrapped(x, y, filepath);
    var elapsed_time = process.uptime() - time_before;
    var mem = process.memoryUsage().heapUsed;
  	var cpu_usage = process.cpuUsage(cpu_before);

    
    res.on("finish", () => {  //write metrics to file
      var txt = String("CPU Usage: " + cpu_usage.system + "(system) " + cpu_usage.user + "(user), Memory(bytes): " + mem + " Elapsed time(s): " + elapsed_time
     + " Python file path: " + filepath + "\n");

      fs.appendFile(log_file, txt, (err) => {
        if (err)
          console.log(err);
      });
    })
   
    res.writeHead(200);
    var res_txt = "Result:" + result;
    res.end(res_txt);
  });

  server.listen(port_number);
}


if(!module.parent) {
  startServer();
} else {
  module.exports = startServer;
}