
var cnavasToPng = exports.cnavasToPng = function(canvas,writer){
	canvas.toDataURL(function(err, str){
		writer.write(str);
    });
	
}