//require
var   assert 			= require("assert")
	, shapeFileReader 	= require("../../lib/reader/ShapeFileReader")
	, shapeFileLoader 	= require("../../lib/loader/ShapeFileLoader")
	, model  			= require("../../lib/model/TranslateModel.js")
	, adaptor			= require("../../lib/adaptor/database/pg/PostGisAdaptor.js")
	, Parser 			= require("../../lib/parser/GeoJSON").obj;
//LP_PA_CBND-1100000000, rail,park,bar
var filePath ="/Users/keen/dev/file/shp/bar.shp";
var parser = new Parser();
var option ={
		"parser" : parser
		, srid : "5186" //EPSG
		,"dbfRead": function( fields ){
//			console.log("dbfRead");
//			console.log(fields);
		}
		,"afterRead": function( header ){
			var featureCollection = parser.getParsedColection( header );
//			console.log(featureCollection);
//			console.log("ended!");
		}
		,"singleRead" :  function( record, fields, dbfSingleRow ){
//			console.log(fields);
//			console.log("dbfSingleRow");
			var feature = parser.getParsedRecord( record, fields, dbfSingleRow );
//			console.log(feature);
		}
		,rowLimit : 0
};
shapeFileReader.init( filePath , option );
shapeFileLoader.load( shapeFileReader, function( source ){
	model.setAdaptor( source , adaptor );
	model.create( function(){
		model.insert( function(){
			console.log("done!")
		});
	});
});


