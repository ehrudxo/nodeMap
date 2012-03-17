var response;
var setResponse = exports.setResponse = function(res){
	response = res;
}
var write = exports.write = function(pngStr)
{
	response.send("<img src='"+pngStr+"'></img>");
}