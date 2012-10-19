var pool;
var connString = 'tcp://nodeMap:asdf@localhost/nodeMap';
var setPool = exports.setPool = function(poolIn){
	console.log(poolIn);
	pool = poolIn;
};
var setExtent = exports.setExtent = function( layer, bounds, callback ){
	console.log(pool);
	pool.connect(connString, function(err, client) {
        client.query('SELECT hgo_sno from bar where gid=$1', ['1'], function(err, result) {
        	if(err){
        		console.log(err);
        	}
        	console.log(result.rows[0]["hgo_sno"]);
        	callback(result.rows[0]["hgo_sno"]);
        });
     });
};
