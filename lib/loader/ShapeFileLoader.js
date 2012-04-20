/**
 * 
 */
var load = exports.load = function load(shapeFileReader, callback ){
	shapeFileReader.read( function( dbf,shape ){
		var source ={
				name : dbf.name
				, dbf : dbf
				, shape : shape
		}
		callback( source );
	});
}

