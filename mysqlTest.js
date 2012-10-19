var http = require('http'),
    mysql = require('db-mysql'),
    generic_pool = require('generic-pool');

var pool = generic_pool.Pool({
    name: 'mysql',
    max: 10,
    create: function(callback) {
        new mysql.Database({
        	 hostname: 'localhost',
             user: 'root',
             password: 'anjwl?',
             database: 'biblewiki'
        }).connect(function(err, server) {
            callback(err, this);
        });
    },
    destroy: function(db) {
        db.disconnect();
    }
});

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    pool.acquire(function(err, db) {
        if (err) {
            return res.end("CONNECTION error: " + err);
        }

        db.query().select('*').from('user').execute(function(err, rows, columns) {
            pool.release(db);

            if (err) {
                return res.end("QUERY ERROR: " + err);
            }

            res.end(rows[0]["user_name"].toString());
        });
    });
}).listen(8080);

console.log('Server running at http://127.0.0.1:8001/');