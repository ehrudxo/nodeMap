var bind = exports.bind = function(object, method){
	return function() {
	    return method.apply(object, arguments);
	};
}
var StringBuffer = exports.StringBuffer = function StringBuffer() {
    this.buffer = [];
}

StringBuffer.prototype.toString = function toString() {
    return this.buffer.join("");
};
StringBuffer.prototype.append = function append(str) {
    this.buffer.push(str);
    return this;
};
