//require
var   assert = require("assert")
	, fs = require("fs")
	, shapeFileReader = require("../../lib/reader/ShapeFileReader")
	, Parser = require("../../lib/parser/GeoJSON").obj;

//LP_PA_CBND-1100000000, rail,bath
var filePath ="/Users/keen/dev/file/shp/bath.shp";
var fileTo = "/Users/keen/dev/file/dummy.txt";
var parser = new Parser();
var option ={
		"parser" : parser 
//		,"dbfRead": function( fields ){
////			console.log("dbfRead");
////			console.log(fields);
//		}
//		,"afterRead": function( header ){
//			var featureCollection = parser.getParsedColection( header );
////			console.log(featureCollection);
//		}
//		,"singleRead" :  function( record, fields, dbfSingleRow ){
////			console.log(fields,dbfSingleRow,record);
////			console.log("dbfSingleRow");
//			var feature = parser.getParsedRecord( record, fields, dbfSingleRow );
////			console.log(feature);
//		}
		,rowLimit : 0
};
shapeFileReader.init( filePath , option );
shapeFileReader.read( function( dbf,shape ){
	fs.createWriteStream(fileTo)
//	console.log("readAll", dbf );
});


