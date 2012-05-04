var util = require('util')
	, BaseTypes = require('../atomic/Basetypes')
	, LonLat = BaseTypes.LonLat
	, Bounds = BaseTypes.Bounds;
	
var adaptor,context;
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
	adaptor.setExtent( self, bounds, function( geometries ){
		styler.draw( geometries, bounds, function(){
			self.emit("drawEnd", geometries, callback );	
		});
	} );
};
Layer.prototype.setAdaptor = function( adaptorIn ){
	adaptor = adaptorIn;
} 
Layer.prototype.setStyler = function( stylerIn ){
	styler = stylerIn;
}
