var Brush = require('../../lib/styler/Brush').Brush
	, Canvas = require('canvas')
	, fs = require('fs')
	, writer = require('../../lib/writer/FileWriter');

writer.setFilePath( "/Users/keen/dev/file/img/testBrush.png" );	
var canvas  = new Canvas( 800, 600 );
var context = canvas.getContext( '2d' );
var geometry ={
		coordinates : [ 100,100
		               ]
};
var map ={
		canvas : canvas,
		context : context,
		resolution : 1
}
var brush = new Brush({fillStyle:"#8ED6FF",strokeStyle : "black",radius:10});
//map.context.scale( 1/map.resolution, 1/map.resolution );
//map.context.translate( - bounds.minx, - bounds.miny );

map.context.scale( 1, -1 );
map.context.translate( 0, -600);
brush.draw( map , geometry );
//var stream = map.canvas.createPNGStream();
//var data="";
//stream.on('data', function(chunk){
//	data +=chunk;
//});
//
//stream.on('end', function(){
//  fs.writeFile('/Users/keen/dev/file/img/testBrush.png',data,"binary", function(){
//	  console.log("-_-");
//  });
//});
map.canvas.toDataURL( function( err, str ){
	if( !err && str ){
		writer.write( str );
	}
} );