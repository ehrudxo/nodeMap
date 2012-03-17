var byteHandler = require('../../handler/ByteHandler');

var read = exports.read = function( bufferRead, func ){
//	byteHandler.getInt(bufferRead,true),byteHandler.getDouble(bufferRead),byteHandler.getDouble(bufferRead)
	var recordNumber  =  byteHandler.getInt(bufferRead,true);
	var contentLength =  byteHandler.getInt(bufferRead,true);
	console.log(recordNumber,contentLength);
	
	console.log("protocol read!",byteHandler.getInt(bufferRead,true),byteHandler.getDouble(bufferRead),byteHandler.getDouble(bufferRead));
};