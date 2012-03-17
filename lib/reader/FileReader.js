var fs = require('fs');
var read = exports.read = function(filePath,func){
	fs.readFile(filePath,"base64" ,function(err,data){
		if(err) throw err;
		else func(err,data);
	});
}
var readLines = exports.readLines = function(path, func, finalize) {
	var input = fs.createReadStream(path);
	var remaining = '';

	input.on('data', function(data) {
		remaining += data;
		var index = remaining.indexOf('\n');
		while (index > -1) {
			var line = remaining.substring(0, index);
			remaining = remaining.substring(index + 1);
			func(line);
			index = remaining.indexOf('\n');
	    }
	});

	input.on('end', function() {
		if (remaining.length > 0) {
			func(remaining,"last");
		}else{
			finalize();
		}
		console.log("end");
	});
}
var readBuffer = exports.readBuffer = function(filePath,func){
	fs.readFile(filePath,function(err,data){
		if(err) throw err;
		else func(err,data);
	});
}