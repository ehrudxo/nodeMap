var http = require('http'),
    pg = require('pg')
    util = require('util');
    
var connString = 'tcp://nodeMap:asdf@localhost/nodeMap';
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    pg.connect(connString, function(err, client) {
        client.query('SELECT hgo_sno from bar where gid=$1', ['1'], function(err, result) {
        	if(err){
        		console.log(err);
        	}
        	console.log(result.rows[0]["hgo_sno"]);
        	res.end(result.rows[0]["hgo_sno"].toString());
        });
     });
}).listen(8080);

console.log('Server running at http://127.0.0.1:8001/');