var map = require('../lib/NodeMap')
	, Pallete = require("./Pallete")
	, Bar = require('../lib/model/layer/bar').Layer
	, Bounds = require('../lib/atomic/BaseTypes').Bounds
	, styler = require('../lib/styler/Styler') 
	, adaptor = require('../lib/adaptor/database/pg/PostGisAdaptor')
	, writer = require('../lib/writer/FileWriter');

writer.setFilePath( "/Users/keen/dev/file/img/test.png" );	
var cachedir = __dirname+"/cache";
var bar = new Bar();
bar.setAdaptor( adaptor );
styler.init({
	type : "POINT"
});
bar.setStyler( styler );
var bounds = new Bounds(194771.91,468728.68,208634.41,489833.53 );
var size ={ x :"800px",	y : "600px" };
map.init();
map.addLayer( bar );
map.setExtent( bounds, size , function( str ){
	
//		console.log(str);
//		imgWriter.setResponse(res);
//		imgWriter.write(str);
		writer.write(str);
    
});

//"/Users/keen/dev/file/img/test.png",