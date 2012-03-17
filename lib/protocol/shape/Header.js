var ByteHandler = require('../../handler/ByteHandler').handler
	, size = exports.size = 100
	, byteHandler = new ByteHandler();

var fileCode , fileLength , version , geometryType 
	, minx , miny , maxx , maxy 
	, minz , maxz , minm , maxm  ;
var read = exports.read = function(bytesRead, bufferRead){
	
	fileCode = byteHandler.getInt(bufferRead,true);
	byteHandler.offSetMove(24);
	fileLength = byteHandler.getInt(bufferRead,true);
	version = byteHandler.getInt(bufferRead);
	geometryType = GEOMETRY_TYPE[byteHandler.getInt(bufferRead)];
	minx = byteHandler.getDouble(bufferRead);
	miny = byteHandler.getDouble(bufferRead);
	maxx = byteHandler.getDouble(bufferRead);
	maxy = byteHandler.getDouble(bufferRead);
	minz = byteHandler.getDouble(bufferRead);
	maxz = byteHandler.getDouble(bufferRead);
	minm = byteHandler.getDouble(bufferRead);
	maxm = byteHandler.getDouble(bufferRead);
};
var getGeometryType = exports.getGeometryType = function(){
	return geometryType;
};
var getBounds = exports.getBounds = function(){
	return [ minx, miny, maxx, maxy ];
}; 

var GEOMETRY_TYPE = exports.GEOMETRY_TYPE =[
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