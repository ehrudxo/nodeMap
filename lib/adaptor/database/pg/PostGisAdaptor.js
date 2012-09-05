var pg = require('pg')
	, util = require('util')
	, StringBuffer = require('../../../util/Util').StringBuffer;
/**
 * connString 
 * 
 */
var connString = 'tcp://nodeMap:asdf@localhost/nodeMap';
var geometryColumnName = "pg_geom"
	,dbf,shape,client,srid;
var create = exports.create = function create( source, callback ){
	dropTable( source, function(){
		createTable( source, function(){
			if( typeof callback === "function" ) {
				callback();	
		    }
		} );
	} );
	
}
var connect = exports.connect = function connect( callback ){
	if(client instanceof pg.Client){
		if( typeof callback === "function" ) callback();
	}else{
		client = new pg.Client(connString);
//		client.on('drain', client.end.bind(client));
		client.on('error', function(error) {
		      console.log(error);
		}); 
		client.connect( function(){
			console.log("db connected");
			if( typeof callback === "function" ) callback();
		});
	}
}
var dropTable = exports.dropTable = function dropTable( source , callback ){
	connect( function() {
	    var sql = "DROP TABLE "+ source.name;
	    client.query(sql, function(err, result) {
	    	console.log(result);
	    	if( typeof callback === "function" ) {
		    	callback();	
		    }
	    });
	});
};
var createTable = exports.createTable = function createTable( source , callback ){
	dbf = source.dbf;
	console.info("[Debug:PostGisAdaptor]table '"+ source.name+"' is now start creating");
	var geometryType = source.shape.header.getGeometryType();
	var dimension = source.shape.header.getDimension(geometryType);
	srid = source.shape.srid;
	connect(function( ) {
		var sb = new StringBuffer();
	    sb.append( "CREATE TABLE " ).append(source.name).append( " (gid serial" );
	    var i,len;
		for(i=0,len= source.dbf.fields.length;i<len;i+=1){
			sb.append(",").append(source.dbf.fields[i]["name"]).append(" ") 
			  .append(getTypeFromShape(source.dbf.fields[i]["type"],source.dbf.fields[i]["length"]));
		}    
		sb.append(")");
		client.query(sb.toString(), function( err, result ) {
	    	console.log( err, result );
	    	client.query("ALTER TABLE "+source.name+" ADD PRIMARY KEY (gid)", function( err, result ) {
	    		console.log( err, result );
	    		client.query("SELECT AddGeometryColumn('"+source.name+"','"+geometryColumnName+"',"+srid+",'"+geometryType+"',"+dimension+", true);", function( err, result ) {
	    			console.log( err, result );
	    			if( typeof callback === "function" ) {
				    	callback();	
				    }
		    	});
	    	});	
	    });
	});
};
var insertRows = exports.insertRows = function ( source, callback ){
	connect( function( ) {
		var records = source.dbf.records;
		var fields  = source.dbf.fields;
		var shapes = source.shape.body;
		//("shape",shapes);
		var type = source.shape.header.getGeometryType();
		var rLen = records.length;
		for(var i=0;i<rLen;i++){
			insertRow( source.name , fields, records[i], type, shapes[i]);
		}
//		console.log(fields);
		
	});
};
var insertRow = exports.insertRow = function( tableName, fields, record, type, feature){
	var sb = new StringBuffer();
    sb.append("INSERT INTO  ").append( tableName ).append(" ( ").append( geometryColumnName );
    var i,len,values = [];
//    console.log("feature",feature);
    
    values.push(getGeometryValueFromCoordinate( type, feature ));
	for(i=0,len= fields.length;i<len;i+=1){
		sb.append(", ").append( fields[i]["name"] );
		if( fields[i].type == 'Character' )
		{
			values.push("'"+record[fields[i]["name"]]+"'");
		}
		else if( fields[i].type == 'Floating Point'){
			values.push( parseFloat( record[fields[i]["name"]]) );
		}
		else if( fields[i].type == 'Number'){
			values.push( parseInt(record[fields[i]["name"]],10) );
		}
		else if( fields[i].type == 'Double' ){
			values.push( parseDouble(record[fields[i]["name"]]));
		}else if( fields[i].type == 'Integer' ){
			values.push( parseInt( record[fields[i]["name"]],10) );
		}else if ( fields[i].type == 'Date' ){
			//Date
		}else{
			values.push("'"+record[fields[i]["name"]]+"'");
		}
	}
	
	sb.append(" ) values ( ");
	sb.append(values.join());
//	for(i=2,len= dbf.fields.length+2;i<len;i+=1){
//		sb.append(", ").append( "$"+i ); 
//	}
	sb.append(" )");
//	console.log(sb.toString());
	client.query(sb.toString(),  function(err, result) {
    	console.log(err,result);
    });
}
var getGeometryValueFromCoordinate = exports.getGeometryValueFromCoordinate = function getGeometryValueFromCoordinate(type,feature){
	if(type == "POINT"){
		if(feature && feature.coordinates && typeof feature === "object" )
		return "ST_GeomFromText('POINT("+ feature.coordinates[0][0] + " " + feature.coordinates[0][1]+")',"+srid+")";
		else return "''";
		
	}else if(type == "POLYLINE"){
		
	}else{
		return shape;
	}
	
}
var getTypeFromShape =exports.getTypeFromShape = function getTypeFromShape(type,length){
	if(type == "Character"){
		return "varchar("+length+")";
	}else if (type == "Floating Point" || type == "Number" || type == "Double" ){
		return "numeric";
	}else if (type == "Integer"){
		return "integer";
	}else if (type == "Date"){
		return "date";
	}else{
		console.warn("[Unexpected Type]");
		return null;
	}
};
/**
 * 
 */
var select = exports.select = function select( layer ,bounds, callback ){
	if(typeof layer !== "undefined" &&
			typeof layer.styler !== "undefined" && 
				typeof layer.styler.conditions!== "undefined" && util.isArray( layer.styler.conditions ) ){
		
		var conditions = layer.styler.conditions, len = conditions.length;
		for(var i=0;i<len;i++){
			var query = "SELECT "+ layer.cols.join() +", ST_AsGeoJSON("+geometryColumnName+") AS geometry  , "+i+" AS conditionId" ;
			query =	query + " FROM "+layer.name;
			query = query + " WHERE "+ conditions[i].toString() +" and ("+geometryColumnName+" && ";
			query = query + "ST_MakeEnvelope("+ bounds.toBboxString() + ") )";
			console.log(query);
			client.query(query, function(err, result) {
				if(err){
					console.log( "error occurred"+err );
					end();
				}else if(typeof result == "object"){
					callback(result.rows);
				}else{
					console.log("unexpected!",err);
				}
			});	
		}
	}
};
var setExtent = exports.setExtent = function( layer, bounds, callback ){
	connect(function(){
		select( layer, bounds, callback );
	});
};
var end = exports.end = function(){
	pg.end();
	client.end();
	client = undefined;
};