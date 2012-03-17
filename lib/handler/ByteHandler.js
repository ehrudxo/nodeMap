var handler = exports.handler = function(){
	
	this.iOffset = 0;
	this.offSetMove = function(offSet){
			this.iOffset = offSet;
	};
	this.offSetMoveBy = function(offSet){
		this.iOffset += offSet;
	};
	this.getOffset = function(){
		return this.iOffset;
	};
	this.getByte =  function( bufferRead ){
		this.iOffset ++;
		return bufferRead[this.iOffset -1 ];
	};
	this.getInt =  function(bufferRead, isBigEndian){
		var buffer = new Buffer(4);
		buffer[0]= bufferRead[this.iOffset];
		buffer[1]= bufferRead[this.iOffset + 1];
		buffer[2]= bufferRead[this.iOffset + 2];
		buffer[3]= bufferRead[this.iOffset + 3];
		this.iOffset += 4;
		if(isBigEndian)
			return buffer.readInt32BE(0);
		else
			return buffer.readInt32LE(0);
	};
	this.getShort =  function(bufferRead, isBigEndian){
		var buffer = new Buffer(2);
		buffer[0]= bufferRead[this.iOffset];
		buffer[1]= bufferRead[this.iOffset + 1];
		this.iOffset += 2;
		if(isBigEndian)
			return buffer.readInt16BE(0);
		else
			return buffer.readInt16LE(0);
	};
	this.getDouble = function( bufferRead , isBigEndian){
		var buffer = new Buffer(8);
		buffer[0]= bufferRead[this.iOffset];
		buffer[1]= bufferRead[this.iOffset + 1];
		buffer[2]= bufferRead[this.iOffset + 2];
		buffer[3]= bufferRead[this.iOffset + 3];
		buffer[4]= bufferRead[this.iOffset + 4];
		buffer[5]= bufferRead[this.iOffset + 5];
		buffer[6]= bufferRead[this.iOffset + 6];
		buffer[7]= bufferRead[this.iOffset + 7];
		this.iOffset += 8;
		if( isBigEndian )
			return buffer.readDoubleBE(0);
		else
			return buffer.readDoubleLE(0);
	};
	this.className = "nodeMap.handler.ByteHandler";
}