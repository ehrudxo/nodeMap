var Canvas = require('canvas')
	, fs = require('fs')
	, sys = require('util')
	, fileWriter = require('./writer/FileWriter')
	, imgWriter = require('./writer/ImgTagWriter')
	, Image = Canvas.Image;
var tileSize = 800;
var map = exports.map = function(option){
	var extent
	,resolution
	,layers
	,canvas
	,context,drawCount,drawCallback;
}
var Logger= exports.Logger = function(){
	console.log.apply(this, arguments);
}
exports.version="0.1";

var init = exports.init = function ( option ) {
	map.layers = [];
} 
var addLayer = exports.addLayer = function (layer){
	layer.setMap( map );
	layer.on("drawEnd", function( geometries ){
		if(!drawCount){
			/**
			 * To Do toDataURL -> createPNGStream. it is more effective maybe
			 */
			map.canvas.toDataURL( function( err, str ){
				if( !err && str ){
					drawCallback( str );
				}
			} );
		}
	});
	var seq = map.layers.length;
	layer.setId( seq );
	map.layers.push(layer);
}

var setExtent = exports.setExtent = function ( layerIds, bounds, size , callback ){
	drawCallback = callback;
	map.canvas = new Canvas( parseFloat( size.x ), parseFloat( size.y ) );
	map.context = map.canvas.getContext( '2d' );
	map.resolution = bounds.getHeight() / parseFloat(size.y);
	var i=0,len = layerIds.length;
	drawCount=len;
	for ( ; i < len; i++) {
		drawCount--;
		var layer = getLayerFromLayerIds( layerIds[i] );
		layer.setExtent( bounds );
	}
}

var getLayerFromLayerIds = function( layerId ){
	return map.layers[layerId.substring(layerId.lastIndexOf("-") + 1)];
}
