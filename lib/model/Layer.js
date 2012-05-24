var util = require('util')
	, BaseTypes = require('../atomic/Basetypes')
	, LonLat = BaseTypes.LonLat
	, Bounds = BaseTypes.Bounds;
	
var adaptor,context,map;
var events = require('events');
var Layer = exports.Layer =  function Layer(){
	events.EventEmitter.call(this);
	this.className = "kr.osgeo.nodeMap.model.Layer";
}
util.inherits(Layer, events.EventEmitter);
Layer.prototype.moveTo = function (lonlat){
	console.log("moveTo");
};
Layer.prototype.setExtent = function ( bounds, callback ){
	var self = this;
	this.conditionSize = this.styler.conditions.length;
	this.adaptor.setExtent( self, bounds,  function( rows ){
		Layer.prototype.draw.apply(self,[rows, bounds, callback]);
	});
};
Layer.prototype.draw = function( rows, bounds, callback ){
	if( typeof this.map === "function" && typeof this.map.context === "object"){
		if(this.conditionSize == this.styler.conditions.length){
				map = this.map;
				map.context.scale( 1/map.resolution, -1/map.resolution );
				map.context.translate( - bounds.minx, - bounds.miny - map.canvas.height*map.resolution);
		}
		this.conditionSize--;
		if(!this.styler){ 
			console.log("Styler has not initialized!");
			return false;6
		}
		var ri = rows.length
		while(ri--){
			var row = rows[ri];
			var conditionId = row["conditionid"];
			var brush = this.styler.getBrushByCondition( conditionId );
			brush.draw( map, row["geometry"] );
		}
		
		if(!this.conditionSize){
			this.emit("drawEnd", rows, callback );
		}
	}
};

Layer.prototype.setGeometryType = function( geometryType ){
	this.geometryType = geometryType;
}
Layer.prototype.setLayerType = function( layerType ){
	this.layerType = layerType;
}
Layer.prototype.setAdaptor = function( adaptor ){
	this.adaptor = adaptor;
} 
Layer.prototype.setStyler = function( styler ){
	this.styler = styler;
}
Layer.prototype.setBrush = function( brush ){
	this.brush = brush;
}
Layer.prototype.setMap = function( map ){
	this.map = map;
}
Layer.prototype.setBrush = function( brush ){
	this.brush = brush;
}
Layer.prototype.setId = function( sequence ){
	var idsep = "-";
	this.id = this.type+idsep+this.name+idsep+sequence;
}