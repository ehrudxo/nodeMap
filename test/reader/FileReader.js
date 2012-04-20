var   assert = require("assert")
	, fileReader = require("../../lib/reader/FileReader")
	, fs =  require("fs");
fileReader.readBuffer("/Users/keen/dev/file/dummy.txt",function(err,data){
	console.log(data.toString());
});