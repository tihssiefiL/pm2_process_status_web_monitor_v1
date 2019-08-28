var http = require('http');
var pm2List = require('./index')
//create a server object:
http.createServer(async function (req, res) {
  await pm2List().then(list => {
    let str = JSON.stringify(list)
    res.write(str); //write a response to the client
  })
  res.end(); //end the response 
}).listen(8080); //the server object listens on port 8080