var fs = require('fs')
	, ByteHandler = require('../../handler/ByteHandler').handler
	, Record = require('./Record')
	, byteHandler= new ByteHandler();
var header,GeoJSONObject;
var fileOffset = 0;
var setHeader = exports.setHeader = function(headerIn){
	header = headerIn;
};
var rowNumLimits = 0;
var setRowNumLimits = exports.setRowNumLimits = function(limitNo){
	rowNumLimits = limitNo;
}
var read = exports.read = function( fd, size, func , singleRowFunc){
	if(header){
		var contentSize = size - header.size;
		fileOffset = byteHandler.getOffset() + header.size;
		rowNum = 0;
		while( fileOffset <  contentSize && (!rowNumLimits)?true:(rowNum < rowNumLimits)  ){
			var record = new Record.reader(fileOffset);
			record.header( fd );
			record.body( fd );
			if(singleRowFunc)singleRowFunc(record);
			fileOffset = record.fileOffset;
	        rowNum++;
		}
		if(func){
			//wierd structure. give me an advice.
			func( header );
		}
	}else{
		console.log("header not set!");
	}

};

var className =exports.className = "NodeMap.protocol.shape.Shape";