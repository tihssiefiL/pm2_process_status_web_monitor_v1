var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello server2!'); //write a response to the client
  res.end(); //end the response
}).listen(8070); //the server object listens on port 8080