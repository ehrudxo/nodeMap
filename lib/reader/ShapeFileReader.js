var fs = require('fs')
	, header = require('../protocol/shape/Header') 
	, byteHandler = require('../handler/ByteHandler')
	, protocol = require("../protocol/shape/Shape")
	, dbf = require("../protocol/shape/dBASE")
	, shx = require("../protocol/shape/ShapeIndex")
	;	
var body;
var headerSize = 100;
/**
 * I recommend you to read shape,dBase File,index file seperately. 
 * @param filePath follow node file pattern
 * @param option {
 * 		parser : nodemap.parser Class,
 * 		afterRead : callback function which occurs after reading all records
 * 		singleRead : function  function which occurs after reading single record
 * 		rowLimit : read limit.(record count)
 * }
 * @param callback callback function 
 */
var read = exports.read = function( filePath,option ){
	readShape(filePath, option, function(){
		readDbaseFile(filePath, function(){
			readIndexFile(filePath, function(){
				console.log("done!");
			});
		});
	});		
};
/**
 * read Shape File 
 * @param filePath follow node file pattern
 * @param option {
 * 		parser : nodemap.parser Class,
 * 		afterRead : callback function which occurs after reading all records
 * 		singleRead : function  function which occurs after reading single record
 * 		rowLimit : read limit.(record count)
 * }
 * @param callback callback function 
 */
var readShape = exports.readShape = function(filePath, option, callback){
	fs.open(filePath,'r',function(err,fd){
		if(err) throw err;
		else fs.fstat(fd, function(err,stats){
			var size = stats.size;
			var buffer = new Buffer(headerSize);
			fs.read(fd, buffer, 0, headerSize, null, function(err, bytesRead, bufferRead){
				if(err) throw err;
				else{
					header.read( bytesRead, bufferRead );
					body = protocol;
					body.setHeader( header );
					body.setRowNumLimits( option.rowLimit );
					body.read( fd, size , option.afterRead,option.singleRead);
					fs.close(fd);
					if(callback) callback();
				}
			});
		});
	});
};
/**
 * read dBaseFile(dbf file format)
 * @param filePath follow node file pattern
 * @param callback
 */
readDbaseFile = exports.readDbaseFile = function(filePath, callback){
	filePath = filePath.substring(0, filePath.indexOf('.shp'))+ ".dbf";
	fs.open(filePath,'r',function(err,fd){
		if(err) throw err;
		else fs.fstat(fd, function(err,stats){
			dbf.read(fd,stats.size);
			fs.close(fd);
			if(callback) callback();
		});
	});
};
/**
 * read index File.(shx file format)
 * @param filePath follow node file pattern
 * @param callback
 */
readIndexFile = exports.readIndexFile = function(filePath, callback){
	filePath = filePath.substring(0, filePath.indexOf('.shp'))+ ".shx";
	fs.open(filePath,'r',function(err,fd){
		if(err) throw err;
		else fs.fstat(fd, function(err,stats){
			shx.read(fd,stats.size);
			fs.close(fd);
			if(callback) callback();
		});
	});
};

