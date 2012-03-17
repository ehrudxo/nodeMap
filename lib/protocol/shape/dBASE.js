var fs = require('fs'), ByteHandler = require('../../handler/ByteHandler').handler;
var read = exports.read = function(fd,size) {
	var buffer = new Buffer(size);
	var bytesRead = fs.readSync(fd, buffer, 0, size, null);
	var byteHandler = new ByteHandler();
	var header = new dBaseHeader(byteHandler, buffer);
	console.log("header below");
	console.log(header);

	var bbuf,fields = [];
	while (!(((bbuf = byteHandler.getByte(buffer)) == undefined) || bbuf == 0x0D)) {
		byteHandler.offSetMoveBy(-1);
		console.log(byteHandler.getOffset());
		fields.push(new dBaseField(byteHandler, buffer));
	}
	console.log("fields below");
	console.log(fields);
	var records = [];
	for ( var i = 0, lengthRN = header.recordNumber; i < lengthRN; i++) {
		records.push(new dBaseRecord(byteHandler,buffer,fields));
	}
	console.log("records below");
	console.log( records );
};
var dBaseRecord = exports.dBaseRecord = function( byteHandler, buffer, fields ) {
	this.isDeleted = byteHandler.getByte(buffer)==0x2A?true:false;
	for ( var i = 0; i < fields.length; i++) {
		var field = fields[i];
		this[field.name] = buffer.toString("ascii", byteHandler.getOffset(), byteHandler.getOffset() + field.length);
		byteHandler.offSetMoveBy(field.length);
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
	this.name = buffer.toString("ascii", offset, offset + 10);
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