var   assert = require("assert")
	, shapFileReader = require("../../lib/reader/FileReader")
	, fs =  require("fs");
shapFileReader.readBuffer(__dirname + "/../../file/txt/temp.txt",function(err,data){
	console.log(data.toString());
});