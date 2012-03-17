//requiring library
var   assert = require("assert")
	, fileWriter = require("../../lib/writer/FileWriter")
	, fileReader = require("../../lib/reader/FileReader")
	, Canvas = require('canvas')
	, Image = Canvas.Image
	, fs =  require("fs");
//var def
var tileSize = 800;
var testImageStr = "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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz/wftgLB709Wg4gAAAABJRU5ErkJggg==";
var testDir = __dirname+"/cache";
fileWriter.setCacheDir(testDir);
fileWriter.checkCacheDir(testDir, function(hasCacheDir){
	if(hasCacheDir){
		console.log(testDir + " already exists");
		assert.ok(hasCacheDir, "successfully checked!");
		write();
	}else{
		fileWriter.makeCacheDir(function(){
			var hasDirectory = false;
			fs.lstat(testDir,function(err,stats){
				if(err){
					hasDirectory = false;
				}else{
					hasDirectory = true;
				}
				assert.ok(hasDirectory,"successfully directory made");
				write();
			});	
		});	
	}
});
var write = function(){
	var canvas = new Canvas(tileSize, tileSize);
    var ctx = canvas.getContext('2d');
    var img = new Image;
    var dx = 100,dy=100;
    var func = testFromReader;
    var filename = testDir + "/testImage.png";
	img.onload = function(){
		ctx.drawImage(img,dx,dy);
		canvas.toDataURL(function(err, str){
			fileWriter.write(filename,str, func);
	    });
	};
	img.onerror = function(){
		console.log("loading error");
	};
	img.src = __dirname+"/../../img/"+'marker-green.png';
	console.log(img.src);
}
var testFromReader = function(filename){
	fileReader.read(filename,function(data){
		assert.ok(data == testImageStr);
	});
}