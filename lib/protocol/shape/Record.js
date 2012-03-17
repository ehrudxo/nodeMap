var fs = require('fs')
	, header = require('./Header.js')
	, ByteHandler = require('../../handler/ByteHandler').handler;
var reader = exports.reader = function( fileOffset ){
	this.geometryType = null;
	this.fileOffset = fileOffset;
	this.byteHandler = new ByteHandler();
	this.bbox = null;
	this.recordNumber = 0;
	this.numParts = 0;
	this.numPoints = 0;
	this.coordinates=[];
	
	this["header"] = function( fd ){
		this.byteHandler.offSetMove(0);
		this.fileOffset = fileOffset;
		var bufferSize = 12;
		var buffer = new Buffer( bufferSize );
		var bytesRead = fs.readSync(fd, buffer, 0 , bufferSize, this.fileOffset);
		this.fileOffset += bytesRead;
		this.recordNumber = this.byteHandler.getInt(buffer,true);
		//contentLength but useless
		this.byteHandler.getInt(buffer,true);
		this.geometryType = header.GEOMETRY_TYPE[this.byteHandler.getInt(buffer)];
		this["intermediate"](fd); 
	};
	
	this["intermediate"] = function(fd){
		this.byteHandler.offSetMove(0);
		if(this.geometryType == "POINT"){
			// do nothing geometry Type goes record header.
		}else if(this.geometryType == "POLYLINE" ||this.geometryType == "POLYGON" ){
			var bufferSize = 40;
			var buffer = new Buffer( bufferSize );
			var bytesRead = fs.readSync(fd, buffer, 0 , bufferSize, this.fileOffset);
			this.bbox ={ 	
					minx: this.byteHandler.getDouble(buffer),
		    		miny: this.byteHandler.getDouble(buffer),
		    		maxx: this.byteHandler.getDouble(buffer),
		    		maxy: this.byteHandler.getDouble(buffer) 
			};
			this.numParts = this.byteHandler.getInt(buffer);
			this.numPoints = this.byteHandler.getInt(buffer);
			this.fileOffset += bytesRead;
			
		}else{
			console.log("There is a problem!");
		}
	};
	this["body"] = function(fd ){
		this.byteHandler.offSetMove(0);
		if(this.geometryType == "POINT"){
			var bufferSize  = 16; 
			var buffer = new Buffer( bufferSize );
			var bytesRead = fs.readSync(fd, buffer, 0 , bufferSize, this.fileOffset );
			this.fileOffset += bytesRead;
			this.coordinates.push([this.byteHandler.getDouble(buffer),this.byteHandler.getDouble(buffer)])
		}else if(this.geometryType == "POLYLINE" ||this.geometryType == "POLYGON" ){
			var bufferSize  = this.numParts*4; 
			var buffer = new Buffer( bufferSize );
			var bytesRead = fs.readSync(fd, buffer, 0 , bufferSize, this.fileOffset );
			this.fileOffset += bytesRead;
			var parts = [];
			while(this.numParts--){
				parts.push(this.byteHandler.getInt(buffer));
			}
			
			this.byteHandler.offSetMove(0);
			bufferSize = this.numPoints*2*8;
			buffer = new Buffer( bufferSize );
			bytesRead = fs.readSync(fd, buffer, 0 , bufferSize, this.fileOffset );
			this.fileOffset += bytesRead;
			var points =[];
			while(this.numPoints--){
				points.push([this.byteHandler.getDouble(buffer),this.byteHandler.getDouble(buffer)]);
			} 
			var removed = 0;
		    var split;
		    parts.shift();                    
		    while(parts.length) {
		        split = parts.shift();
		        this.coordinates.push(points.splice(0,split-removed));
		        removed = split;
		    }       
		    this.coordinates.push(points);
		}
	};
};