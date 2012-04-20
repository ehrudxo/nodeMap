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
var read = exports.read = function( fd, size, func , singleRowFunc, dbf ){
	var records=[];
	if(header){
		var contentSize = size - header.size, fields;
		fileOffset = byteHandler.getOffset() + header.size;
		rowNum = 0;
		if(dbf) fields = dbf.fields;
		while( fileOffset <  contentSize && (!rowNumLimits)?true:(rowNum < rowNumLimits)  ){
			var record = new Record.reader(fileOffset);
			record.header( fd );
			record.body( fd );
			if( typeof singleRowFunc === "function" ){
				if( dbf ){
					singleRowFunc( record, dbf.fields, dbf.records[rowNum] );
				}else{
					singleRowFunc( record );
				}
			}
			fileOffset = record.fileOffset;
			records.push(record);
	        rowNum++;
	        console.log(rowNum,header.size,size);
		}
	
		if( typeof func === "function" ){
			//wierd structure. give me an advice.
			func( header );
		}
		return records;
	}else{
		console.log("header not set!");
	}

};

var className =exports.className = "NodeMap.protocol.shape.Shape";