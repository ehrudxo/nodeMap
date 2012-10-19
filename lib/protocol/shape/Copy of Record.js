var fs = require('fs')
	, header = require('./Header.js')
	, util = require('../../util/Util.js')
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
	
	this["header"] = function( fd, callback ){
		this.byteHandler.offSetMove(0);
		this.fileOffset = fileOffset;
		var bufferSize = 12;
		var buffer = new Buffer( bufferSize );
		var rec = this;
		
		fs.read(fd, buffer, 0 , bufferSize, this.fileOffset, function(err, bytesRead, buffer){
			rec.fileOffset += bytesRead;
			rec.recordNumber = rec.byteHandler.getInt(buffer,true);
			//contentLength but useless
			rec.byteHandler.getInt(buffer,true);
			rec.geometryType = header.GEOMETRY_TYPE[rec.byteHandler.getInt(buffer)];
			rec["intermediate"](fd,callback); 
		});
		
	};
	
	this["intermediate"] = function(fd,callback){
		this.byteHandler.offSetMove(0);
		if(this.geometryType == "POINT"){
			if(callback)callback( fd );
		}else if(this.geometryType == "POLYLINE" ||this.geometryType == "POLYGON" ){
			var bufferSize = 40;
			var buffer = new Buffer( bufferSize );
			var rec = this;
			console.log("header2");
			fs.read(fd, buffer, 0 , bufferSize, this.fileOffset, function(err, bytesRead, buffer){
				rec.bbox ={ 	
						minx: rec.byteHandler.getDouble(buffer),
			    		miny: rec.byteHandler.getDouble(buffer),
			    		maxx: rec.byteHandler.getDouble(buffer),
			    		maxy: rec.byteHandler.getDouble(buffer) 
				};
				rec.numParts = rec.byteHandler.getInt(buffer);
				rec.numPoints = rec.byteHandler.getInt(buffer);
				rec.fileOffset += bytesRead;
				if(callback)callback( fd );	
			});
		}else{
			console.log("There is a problem!");
		}
	};
	this["body"] = function( fd ){
		console.log(this,this.fileOffset);
		this.byteHandler.offSetMove(0);
		var rec = this;
		if(this.geometryType == "POINT"){
			var bufferSize  = 16; 
			var buffer = new Buffer( bufferSize );
			fs.read(fd, buffer, 0 , bufferSize, this.fileOffset , function(err, bytesRead, buffer){
				rec.fileOffset += bytesRead;
				rec.coordinates.push([rec.byteHandler.getDouble(buffer),rec.byteHandler.getDouble(buffer)]);
			});
		}else if(this.geometryType == "POLYLINE" ||this.geometryType == "POLYGON" ){
			var bufferSize  = this.numParts*4;
			console.log("bufferSize,this.fileOffset:",bufferSize,this.fileOffset);
			var buffer = new Buffer( bufferSize );
			fs.read(fd, buffer, 0 , bufferSize, this.fileOffset , function(err, bytesRead, buffer){
				rec.fileOffset += bytesRead;
				var parts = [];
				while(rec.numParts--){
					parts.push(rec.byteHandler.getInt(buffer));
				}
				
				rec.byteHandler.offSetMove(0);
				bufferSize = rec.numPoints*2*8;
				buffer = new Buffer( bufferSize );
				fs.read(fd, buffer, 0 , bufferSize, rec.fileOffset , function(err, bytesRead, buffer){
					rec.fileOffset += bytesRead;
					var points =[];
					while(rec.numPoints--){
						points.push([rec.byteHandler.getDouble(buffer),rec.byteHandler.getDouble(buffer)]);
					} 
					var removed = 0;
				    var split;
				    parts.shift();                    
				    while(parts.length) {
				        split = parts.shift();
				        rec.coordinates.push(points.splice(0,split-removed));
				        removed = split;
				    }       
				    rec.coordinates.push(points);	
				});
			});
		}
	};
	
	this["className"] = "nodeMap.protocol.shape.Record";
};