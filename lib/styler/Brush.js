var ce = require('cloneextend');
var Brush = exports.Brush = function(option){
	this.fillStyle
	, this.strokeStyle="black"
	, this.lineWidth = 3
	, this.lineCap = "round"
	, this.lineJoin = "round"
	, this.radius
	, this.startAngle = 0
	, this.endAngle = 2*Math.PI
	, this.antiClockwise = false
	, this.fillOpacity = 1
	, this.imageObj;	
	if( typeof option !== "undefined")
	{
		if( typeof option.fillStyle !== "undefined" ) 		this.fillStyle = option.fillStyle;  
		if( typeof option.strokeStyle !== "undefined" ) 	this.strokeStyle =option.strokeStyle;
		if( typeof option.lineWidth !== "undefined" ) 		this.lineWidth = option.lineWidth;
		if( typeof option.lineCap !== "undefined" ) 		this.lineCap = option.lineCap;
		if( typeof option.lineJoin !== "undefined" ) 		this.lineJoin = option.lineJoin;
		if( typeof option.radius !== "undefined" ) 			this.radius = option.radius;
		if( typeof option.startAngle !== "undefined" ) 		this.startAngle = option.startAngle;
		if( typeof option.endAngle !== "undefined" ) 		this.endAngle = option.endAngle;
		if( typeof option.antiClockwise !== "undefined" ) 	this.antiClockwise = option.antiClockwise;
		if( typeof option.imageObj !== "undefined" ) 		this.imageObj = option.imageObj;
		if( typeof option.fillOpacity !== "undefined" ) 	this.fillOpacity = option.fillOpacity;
	}
	
	this.draw = function( map, geometry ){
		if(typeof geometry !== "object"){
			geometry = JSON.parse(geometry);
		}
		var coordinates = geometry.coordinates,len = coordinates.length;
		
		map.context.beginPath();//beginPath가문제 
		if( typeof this.imageObj !== "undefined" ){
			map.context.drawImage( this.imageObj , coordinates[0], coordinates[1] );
			//return true;
		}else{
			if( typeof this.radius !== "undefined" || len == 2){
				if(len == 2 && typeof this.radius === "undefined") this.radius =3;
				var realRadius = map.resolution * this.radius;
				map.context.arc( coordinates[0], coordinates[1], realRadius, this.startAngle, this.endAngle, this.antiClockwise );
			}else{
				for(var i=0;i<len;i=i+2){
					if(i==0){
						map.context.moveTo(coordinates[i],coordinates[i+1]);
					}else{
						map.context.lineTo(coordinates[i],coordinates[i+1]);
					}
				}
			}
			if( typeof this.fillStyle !== "undefined" ){
				map.context.fillStyle 	= this.fillStyle;
				map.context.fill();
			}
			map.context.lineWidth 	= this.lineWidth * map.resolution;
			map.context.lineCap 	= this.lineCap;
			map.context.lineJoin 	= this.lineJoin;
			map.context.strokeStyle	= this.strokeStyle;
			map.context.globalAlpha	= this.fillOpacity;
			map.context.stroke();
		}
		
		return true;
	}
	this.setFillStyle = function( fillStyle ){ 
		this.fillStyle = fillStyle; 
	}
	this.setStrokeStyle = function( strokeStyle ){ 
		this.strokeStyle = strokeStyle; 
	}
	this.setLineWidth = function( lineWidth ){ 
		this.lineWidth = lineWidth; 
	}
	this.setLineCap = function( lineCap ){ 
		this.lineCap = lineCap; 
	}
	this.setLineJoin = function( lineJoin ){ 
		this.lineJoin = lineJoin; 
	}
	this.setRadius = function( radius ){ 
		this.radius = radius; 
	}
	this.setStartAngle = function( startAngle ){ 
		this.startAngle = startAngle; 
	}
	this.setEndAngle = function( endAngle ){ 
		this.endAngle = endAngle; 
	}
	this.setAntiClockwise = function( antiClockwise ){ 
		this.antiClockwise = antiClockwise; 
	}
	this.setImageObj = function( imageObj ){ 
		this.imageObj = imageObj; 
	}
}