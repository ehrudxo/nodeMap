var fs = require('fs'), ByteHandler = require('../../handler/ByteHandler').handler;
var read = exports.read = function( fd, size, dbfRead, callback ) {
	var byteHandler = new ByteHandler();
	var buffer = new Buffer(size,byteHandler.encoding);
	var bytesRead = fs.readSync(fd, buffer, 0, size, null);
	var header = new dBaseHeader(byteHandler, buffer);

	var bbuf,fields = [];
	while (!(((bbuf = byteHandler.getByte(buffer)) == undefined) || bbuf == 0x0D)) {
		byteHandler.offSetMoveBy(-1);
		fields.push(new dBaseField(byteHandler, buffer));
	}
	var records = [];
	for ( var i = 0, lengthRN = header.recordNumber; i < lengthRN; i++) {
		records.push(new dBaseRecord(byteHandler,buffer,fields));
	}
	if( typeof dbfRead === "function" ) dbfRead( fields );
	if( typeof callback ==="function" ) callback( fields, records );
};
var dBaseRecord = exports.dBaseRecord = function( byteHandler, buffer, fields ) {
	this.isDeleted = byteHandler.getByte(buffer)==0x2A?true:false;
	for ( var i = 0; i < fields.length; i++) {
		var field = fields[i];
		this[field.name] = byteHandler.getString(buffer,field.length);
	}
};
var dBaseHeader = exports.readFieldName = function(byteHandler, buffer) {
	this.version = byteHandler.getByte(buffer);
	this.year = 1900 + byteHandler.getByte(buffer);
	this.month = byteHandler.getByte(buffer);
	this.day = byteHandler.getByte(buffer);
	this.recordNumber = byteHandler.getInt(buffer);
	this.headerLength = byteHandler.getShort(buffer);
	this.recordLength = byteHandler.getShort(buffer);
	byteHandler.offSetMoveBy(2);
	this.incompleteTransaction = byteHandler.getByte(buffer);
	this.encyrptionFlag = byteHandler.getByte(buffer);
	byteHandler.offSetMoveBy(12);

	this.mdxFlag = byteHandler.getByte(buffer);
	this.languageDriver = byteHandler.getByte(buffer);
	byteHandler.offSetMoveBy(2);
};

var dBaseField = exports.dBaseField = function(byteHandler, buffer) {
	var offset = byteHandler.getOffset();
	var nameLength =11;
	while (nameLength--) {
		if(buffer[offset+nameLength] != '0') break; 
	}
	this.name = buffer.toString("ascii", offset, offset + nameLength+1);
	byteHandler.offSetMoveBy(11);
	// type
	this.type = getType(byteHandler.getByte(buffer));
	// address
	this.address = byteHandler.getInt(buffer);
	// length
	this.length = byteHandler.getByte(buffer);
	// decimal
	this.decimal = byteHandler.getByte(buffer);
	byteHandler.offSetMoveBy(2);
	// id
	this.id = byteHandler.getByte(buffer);
	byteHandler.offSetMoveBy(2);
	// flag
	this.flag = byteHandler.getByte(buffer);
	byteHandler.offSetMoveBy(7);
	// index Flag
	this.idxFlag = byteHandler.getByte(buffer);
};
var getType = exports.getType = function(char) {
	var type = null;
	switch (char) {
	case 67:
		type = 'Character';
		break;
	case 78:
		type = 'Number';
		break;
	case 76:
		type = 'Logical';
		break;
	case 68:
		type = 'Date';
		break;
	case 77:
		type = 'Memo';
		break;
	case 70:
		type = 'Floating Point';
		break;
	case 66:
		type = 'Binary';
		break;
	case 71:
		type = 'General';
		break;
	case 80:
		type = 'Picture';
		break;
	case 89:
		type = 'Currency';
		break;
	case 84:
		type = 'DateTime';
		break;
	case 73:
		type = 'Integer';
		break;
	case 86:
		type = 'VariField';
		break;
	case 88:
		type = 'Variant X';
		break;
	case 64:
		type = 'TimeStamp';
		break;
	case 79:
		type = 'Double';
		break;
	case 43:
		type = 'Auto Increment';
		break;
	default:
		break;
	}
	return type;

};