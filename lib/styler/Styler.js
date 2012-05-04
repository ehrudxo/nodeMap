var Image = require('canvas').Image;
var type,rule,defalutImage,defaultColor;
var inited = false;
var init = exports.init = function(option){
	inited = true;
	if(option !== "undefined"){
		type = option.type;
		rule  = option.rule;
	}
};
var draw = exports.draw = function draw( geometries, bounds , callback ){
	if(!inited){ 
		console.log("Styler has not initialized!");
		return false;
	}
	if( typeof type !== "undefined" ){
		if( typeof rule !== "undefined" ){
			
		}else{
			if( type == "POINT" ){
				var defaultImage = new Image;
				defaultImage.onload = function(){
					drawPoint( geometries, bounds, defaultImage, function(){
						console.log("drawed!");
						callback();	
					} );
					
				};
				defaultImage.onError = function(){
					consol.log("image Loading Error");
					return false;
				}
				defaultImage.src = __dirname+"/../../img/"+'marker-green.png';
				
			}else{
				
			}
		}
	}
};
var drawPoint = function drawPoint( geometries, bounds, defaultImage, callback ){
	var resolution = global.map.resolution;
	var ctx = global.map.ctx,i=0,len = geometries.length;
	for (; i < len; i++)
    {
		var coordinate = JSON.parse(geometries[i].geometry).coordinates;
		ctx.drawImage(defaultImage, (coordinate[0]-bounds.minx)/resolution, ( bounds.maxy - coordinate[1] )/resolution );
    }
	callback();
};