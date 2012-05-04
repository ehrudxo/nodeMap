var util = require('util');
var BaseType = function(){
	
}
var LonLat = exports.LonLat = function(){
	BaseType.call( this );
	var argLen = arguments.length;
	switch (argLen) {
	case 1:
		if( typeof  arguments == "object" ){
			this.lon = arguments[0].lon;
			this.lat = arguments[0].lat;	
		}else{
			this.lon = 0;
			this.lat = 0;
		}
		break;
	case 2:
		this.lon = arguments[0];
		this.lat = arguments[1];	
		break;
	default:
		this.lon = 0;
		this.lat = 0;
		break;
	}
	
	this.toString = function(){
		return "["+this.className+"]lon:"+this.lon+",lat:"+this.lat;
	};
	this.className = "kr.osgeo.nodeMap.BaseType.LonLat";
	return this;
};
var Bonuds = exports.Bounds = function(){
	BaseType.call( this );
	var argLen = arguments.length;
	switch (argLen) {
	case 1:
		if( typeof  arguments == "object" ){
			this.minx = arguments[0].minx;
			this.miny = arguments[0].miny;
			this.maxx = arguments[0].maxx;
			this.maxy = arguments[0].maxy;
		}else{
			this.minx = 0;
			this.miny = 0;
			this.maxx = 0;
			this.maxy = 0;
		}
		break;
	case 4:
		this.minx = arguments[0];
		this.miny = arguments[1];
		this.maxx = arguments[2];
		this.maxy = arguments[3];
		break;
	default:
		this.minx = 0;
		this.miny = 0;
		this.maxx = 0;
		this.maxy = 0;
		break;
	}
	this.toString = function(){
		return "["+this.className+"]minx:"+this.minx+",miny:"+this.miny+",maxx:"+this.maxx+",maxy:"+this.maxy;
	};
	this.toBboxString = function(){
		return this.minx+","+this.miny+","+this.maxx+","+this.maxy;
	};
	this.getWidth = function(){
		return this.maxx - this.minx;
	};
	this.getHeight = function(){
		return this.maxy - this.miny;
	};
	this.className = "kr.osgeo.nodeMap.BaseType.LonLat";
	return this;
}
util.inherits(LonLat,BaseType);
util.inherits(Bonuds,BaseType);
