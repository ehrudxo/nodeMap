var nodeMap = require('../lib/NodeMap')
	, Pallete = require("./Pallete")
	, Bar = require('../lib/model/layer/bar').Layer
	, Bounds = require('../lib/atomic/BaseTypes').Bounds
	, Styler = require('../lib/styler/Styler').Styler
	, Condition = require('../lib/styler/Condition').Condition
	, Brush = require('../lib/styler/Brush').Brush
	, adaptor = require('../lib/adaptor/database/pg/PostGisAdaptor')
	, writer = require('../lib/writer/FileWriter');
nodeMap.init();
writer.setFilePath( "/Users/keen/dev/file/img/test.png" );	
var cachedir = __dirname+"/cache";
var style1 = new Styler({
	conditions : [new Condition({
		key : "dcb_se",
		comparator : "=",
		comparable : " "
	}),new Condition({
		key : "dcb_se",
		comparator : "=",
		comparable : "1"
	}),new Condition({
		key : "dcb_se",
		comparator : "=",
		comparable : "2"
	})
	],
	brushes :[
	          new Brush({fillStyle:"#8ED600",strokeStyle : "red",radius:8}),
	          new Brush({fillStyle:"#8ED6FF",strokeStyle : "black",radius:10}),
	          new Brush({fillStyle:"#8E33FF",strokeStyle : "yellow",radius:10})
	          ]
});
var bar = new Bar();
bar.setStyler( style1 );
bar.setAdaptor( adaptor );
nodeMap.addLayer( bar );
var layers	= [ "dbAdaptor-bar-0" ];
var bounds	= new Bounds(194771.91,468728.68,208634.41,489833.53 );
var size ={ x :"800px",	y : "600px" };

nodeMap.setExtent( layers, bounds, size , function( str ){
	
//		console.log(str);
//		imgWriter.setResponse(res);
//		imgWriter.write(str);
		writer.write(str);
		adaptor.end();
    
});

//"/Users/keen/dev/file/img/test.png",