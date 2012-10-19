var mysql = require('db-mysql')
	, generic_pool = require('generic-pool')
	, util = require('util')
	, StringBuffer = require('../../../util/Util').StringBuffer;
var pool = generic_pool.Pool({
    name: 'mysql',
    max: 30,
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

var select = exports.select = function select( layer ,bounds, callback ){
	if(typeof layer !== "undefined" &&
			typeof layer.styler !== "undefined" && 
				typeof layer.styler.conditions!== "undefined" && util.isArray( layer.styler.conditions ) ){
		
		var conditions = layer.styler.conditions, len = conditions.length;
		for(var i=0;i<len;i++){
			var query = "select * from user";
			pool.acquire(function(err, db) {
		        if (err) {
		            return res.end("CONNECTION error: " + err);
		        }

		        db.query().select('*').from('user').execute(function(err, rows, columns) {
		            pool.release(db);

		            if (err) {
		                return res.end("QUERY ERROR: " + err);
		            }
		            callback(rows[0]["user_name"]);
		        });
		    });
		}
	}
};
var setExtent = exports.setExtent = function( layer, bounds, callback ){
	select( layer, bounds, callback );
};