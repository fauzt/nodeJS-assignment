const fs = require('fs');
const http = require('http');
const url = require('url');
var myAddon = require('bindings')('myaddon');

const FILEPATH = "py/mult.py";
const log_file = "metric.txt"
const port_number = 8080;

console.log("Program started")

function startServer() {
  const server = http.createServer((req, res) => {
    var result;
    var q = url.parse(req.url, true);
    var filepath = q.pathname;
    console.log(filepath);

    var inputs = q.query;
    console.log(inputs);
    var x = Number(inputs.x);
    var y = Number(inputs.y);
    console.log(y);
    if (isNaN(x) || isNaN(y)) {
      res.writeHead(400);
      res.end("Invalid inputs. Please input whole integers into the query url.")
    }
    if (filepath == "/") {
      res.writeHead(404);
      res.end("Invalid filepath.")
    }

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