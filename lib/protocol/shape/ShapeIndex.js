var fs = require('fs'), ByteHandler = require('../../handler/ByteHandler').handler;
var read = exports.read = function(fd,size) {
	var buffer = new Buffer(size);
	var bytesRead = fs.readSync(fd, buffer, 0, size, null);
	var byteHandler = new ByteHandler();
	var shapeIndex = [];
	byteHandler.offSetMove(100);
	while(byteHandler.getOffset() < bytesRead){
		
		shapeIndex.push({
			offset : byteHandler.getInt(buffer,true),
			length : byteHandler.getInt(buffer,true)
		});
	}
};