var Canvas = require('canvas')
	, fs = require('fs')
	, sys = require('util')
	, fileWriter = require('./writer/FileWriter')
	, imgWriter = require('./writer/ImgTagWriter')
	, async = require('async')
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
var createPng = function( geometries ){
	/**
	 * To Do toDataURL -> createPNGStream. it is more effective maybe
	 */
	map.canvas.toDataURL( function( err, str ){
		if( !err && str ){
			drawCallback( str );
		}
	} );
}

var addLayer = exports.addLayer = function (layer){
	layer.setMap( map );
	layer.on("drawEnd", createPng );
	var seq = map.layers.length;
	layer.setId( seq );
	map.layers.push(layer);
}

var setExtent = exports.setExtent = function ( layerIds, bounds, size , callback ){
	drawCallback = callback;
	map.canvas = new Canvas( parseFloat( size.x ), parseFloat( size.y ) );
	map.context = map.canvas.getContext( '2d' );
	map.resolution = bounds.getHeight() / parseFloat(size.y);
	
	async.forEach(layerIds, function(item, after){
		var layer = getLayerFromLayerIds( item );
		layer.setExtent( bounds );
	}, function(err){
		if(err){
			console.log("error haso occurred!", err);
		}else{
			layer.emit( "drawEnd");
		}
	});
}

var getLayerFromLayerIds = function( layerId ){
	return map.layers[layerId.substring(layerId.lastIndexOf("-") + 1)];
}
