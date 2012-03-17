//require
var   assert = require("assert")
	, shapeFileReader = require("../../lib/reader/ShapeFileReader")
	, Parser = require("../../lib/parser/GeoJSON").obj
	, fs =  require("fs");
var parser = new Parser();
var options ={
		"parser" : parser 
		,"afterRead": function( header ){
			var featureCollection = parser.getParsedColection( header );
			//console.log(featureCollection);
			console.log("ended!");
		}
		,"singleRead" :  function(record){
			var feature = parser.getParsedRecord(record);
//			console.log(feature);
		}
		,rowLimit : 0
};
 
//shapeFileReader.read( "/Users/keen/dev/file/shp/LP_PA_CBND-1100000000.shp",options);
shapeFileReader.read( "/Users/keen/dev/file/shp/bath.shp",options);
//shapeFileReader.read( "/Users/keen/dev/file/shp/rail.shp",options);


