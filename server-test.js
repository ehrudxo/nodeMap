var nodeMap 	= require('./lib/NodeMap') 
	, Image 	= require('canvas').Image
	, adaptor 	= require('./lib/adaptor/database/pg/PostGisAdaptor')
	, Styler 	= require('./lib/styler/Styler').Styler
	, Condition = require('./lib/styler/Condition').Condition
	, Brush 	= require('./lib/styler/Brush').Brush
	, Bar 		= require('./lib/model/layer/bar').Layer;
var image = new Image;
image.src = "./img/marker-green.png";
image.onload = function(){console.log("image is loaded!");};
var bar = new Bar();
bar.setAdaptor( adaptor );
var style1 = new Styler({
	conditions : [new Condition({
		key : "dcb_se",
		comparator : "=",
		comparable : "1"
	}),new Condition({
		key : "dcb_se",
		comparator : "=",
		comparable : "2"
	}),new Condition({
		key : "dcb_se",
		comparator : "=",
		comparable : " "
	})
	
	],
	brushes :[new Brush({imageObj: image}),
	          new Brush({fillStyle:"#8ED600",strokeStyle : "red",radius:8}),
	          new Brush({fillStyle:"#8E33FF",strokeStyle : "yellow",radius:10})
	          ]
});
bar.setStyler( style1 );
nodeMap.init();
nodeMap.addLayer( bar );