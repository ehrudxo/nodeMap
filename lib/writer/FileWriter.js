var fs = require('fs')
	, sys = require('util');
var defaultFilePath;
var setFilePath = exports.setFilePath = function( filepath ){
	defaultFilePath = filepath;
}
var setCacheDir = exports.setCacheDir = function(dir){
	cachedir = dir;
}
var checkCacheDir = exports.checkCacheDir = function(dir,func){
	//if(dir typeof function) func = dir;
	var hasCacheDir = false;
	fs.lstat(cachedir,function(err,stats){
		if(err){
			console.log("does not exist" + cachedir);
			hasCacheDir = false;
			func(hasCacheDir);
		}else{
			if(!stats.isDirectory()){
				console.log("It is not directory");
				hasCacheDir = false;
				func(hasCacheDir);
			}else{
				hasCacheDir = true;
				func(hasCacheDir);
			}
		}
	});
}
var makeCacheDir = exports.makeCacheDir= function(func){
	console.log("make cachedir");
	fs.mkdir(cachedir, function(err){
		if(err){
			console.log("error has occurred",err);
		}else{
			console.log(cachedir + " directory is made");
			if(func) func();
		}
		
	});
}
var write = exports.write = function(filename,pngStr )
{
	if( arguments.length == 1 ){
		pngStr = filename;
		filename = defaultFilePath; 
	}
	//png string 을 data *.png 파일로 저장하는 모듈.
	var data = pngStr.replace(/^data:image\/\w+;base64,/, "");
	var buf = new Buffer(data, 'base64');
	fs.writeFile(filename, buf, function(err){
		if(err) throw err;
		else{
			if( typeof func === "function")
			func(filename);
		}
	});
}
