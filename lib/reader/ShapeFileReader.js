var fs = require('fs')
	, header = require('../protocol/shape/Header') 
	, byteHandler = require('../handler/ByteHandler')
	, protocol = require("../protocol/shape/Shape")
	, dbf = require("../protocol/shape/dBASE")
	, shx = require("../protocol/shape/ShapeIndex")
	;	
var body,filePath,option,shape,name;
var headerSize = 100;
var init = exports.init = function init( filePathIn, optionIn ){
	filePath = filePathIn;
	option = optionIn;
	option["dbf"]={};
	name = filePath.substring(filePath.lastIndexOf('/')+1, filePath.indexOf('.shp'));
	shape ={ header:null, body:null , srid:null };
}
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
var read = exports.read = function read( callback ){
	if( typeof filePath !== "string" || typeof option !=="object"){
		console.error("[ShapeFileReader] init error");
		return false;
	}
	readDbaseFile( function(fields,records){
		option.dbf.name = name;
		option.dbf.fields = fields;
		option.dbf.records = records;
		shape.srid = option.srid;
		readShape( function(){
			readIndexFile( function(){
				if( typeof callback==="function" ) callback( option.dbf, shape );
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
var readShape = exports.readShape = function( callback ){
	if( typeof filePath !== "string" || typeof option !=="object"){
		console.error("[ShapeFileReader] init error");
		return false;
	}
	
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
					shape.body = body.read( fd, size , option.afterRead,option.singleRead, option.dbf);
					shape.header = header;
					fs.close(fd);
					if( typeof callback === "function" ) callback( shape );
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
readDbaseFile = exports.readDbaseFile = function( callback ){
	if( typeof filePath !== "string" || typeof option !=="object"){
		console.error("[ShapeFileReader] init error");
		return false;
	}
	var dBaseFilePath = filePath.substring(0, filePath.indexOf('.shp'))+ ".dbf";
	fs.open(dBaseFilePath,'r',function(err,fd){
		if(err) throw err;
		else fs.fstat(fd, function(err,stats){
			dbf.read(fd,stats.size, option.dbfRead ,function(fields,record){
				fs.close(fd);
				if( typeof callback === "function" ) callback(fields,record);	
			});
		});
	});
};
/**
 * read index File.(shx file format)
 * @param filePath follow node file pattern
 * @param callback
 */
readIndexFile = exports.readIndexFile = function( callback ){
	if( typeof filePath !== "string" || typeof option !=="object"){
		console.error("[ShapeFileReader] init error");
		return false;
	}
	var indexFilePath = filePath.substring(0, filePath.indexOf('.shp'))+ ".shx";
	fs.open(indexFilePath,'r',function(err,fd){
		if(err) throw err;
		else fs.fstat(fd, function(err,stats){
			shx.read(fd,stats.size);
			fs.close(fd);
			if( typeof callback === "function" ) callback();
		});
	});
};

