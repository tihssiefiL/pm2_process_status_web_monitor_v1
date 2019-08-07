var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello server3!'); //write a response to the client
  res.end(); //end the response
}).listen(8090); //the server object listens on port 8080