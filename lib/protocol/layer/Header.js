var byteHandler = require('../../handler/ByteHandler');
var fileCode , fileLength , version , shapeType 
	, minx , miny , maxx , maxy 
	, minz , maxz , minm , maxm  ;
var read = exports.read = function(bufferRead){
	fileCode = byteHandler.getInt(bufferRead,true);
	byteHandler.offSetMove(24);
	fileLength = byteHandler.getInt(bufferRead,true);
	version = byteHandler.getInt(bufferRead);
	shapeType = typeOfShape[byteHandler.getInt(bufferRead)];
	minx = byteHandler.getDouble(bufferRead);
	miny = byteHandler.getDouble(bufferRead);
	maxx = byteHandler.getDouble(bufferRead);
	maxy = byteHandler.getDouble(bufferRead);
	minz = byteHandler.getDouble(bufferRead);
	maxz = byteHandler.getDouble(bufferRead);
	minm = byteHandler.getDouble(bufferRead);
	maxm = byteHandler.getDouble(bufferRead);
	console.log("%d bytes read from file. Data is: ",  bufferRead);
	console.log(fileCode,fileLength,version,shapeType);
	console.log(minx,miny,maxx,maxy,minz,maxz,minm,maxm);
	
};
var getShapeType = exports.getShapeType = function(){
	return shapeType;
};
var getBounds = exports.getBounds = function(){
	return {
		minx : minx, miny :  miny, maxx :  maxx, maxy : maxy
	};
}; 
var typeOfShape =[
          	    "NULL", // 0,
          	    "POINT", // 1,
          	    "",
          	    "POLYLINE", // 3, 
          	    "",
          	    "POLYGON", // 5,
          	    "","",
          	    "MULTIPOINT", // 8,
          	    "","",
          	    "POINTZ", // 11,
          	    "",
          	    "POLYLINEZ", // 13,
          	    "",
          	    "POLYGONZ", // 15,
          	    "","",
          	    "MULTIPOINTZ", // 18,
          	    "","",
          	    "POINTM", // 21,
          	    "",
          	    "POLYLINEM", // 23,
          	    "",
          	    "POLYGONM", // 25,
          	    "","",
          	    "MULTIPOINTM", // 28,
          	    "","",
          	    "MULTIPATCH", // 31
          ];
