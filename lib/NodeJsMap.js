var Canvas = require('canvas')
	, mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, mySchema = new Schema({})
	, fs = require('fs')
	, sys = require('util')
	, fileWriter = require('./writer/FileWriter')
	, imgWriter = require('./writer/ImgTagWriter')
	, Image = Canvas.Image;
var tileSize = 800;
var Logger= exports.Logger = function(){
	console.log.apply(this, arguments);
}

exports.version="0.1";
var makeCanvas = exports.makeCanvas = function(res){
	mongoose.model('imagesounds',mySchema);
	var db = mongoose.createConnection("");//url
	if(db){
		var minMax = [{x:236813.2,y:316539},{x:240432.5,y: 327845.1}];
		var xMeterPerPx = (minMax[1].x - minMax[0].x)/tileSize;
		var yMeterPerPx = (minMax[1].y - minMax[0].y)/tileSize;
	
		var canvas = new Canvas(tileSize, tileSize);
	    var ctx = canvas.getContext('2d');
	    
		var ImageSound = db.model('imagesounds');
		var img = new Image;
		img.onload = function(){
			ImageSound.count(function(err,rCount){
				console.log(rCount);
				var imgCnt = 0;
				ImageSound.find(function(err,docs){
					for(var len = docs.length;len--;){
						imgCnt ++;
						var _doc=docs[len];
						var nGeometry = _doc.get("NODE_GEOMETRY");
						var dx = (nGeometry.x-minMax[0].x)/xMeterPerPx ;
						var dy = (nGeometry.y-minMax[0].y)/yMeterPerPx ;
						if(dx>0 && dy>0 && dx<tileSize && dy< tileSize)
						{
								ctx.drawImage(img,dx,dy);
								console.log(imgCnt,dx,dy);
						}
						if(imgCnt == docs.length){
							db.close();
							canvas.toDataURL(function(err, str){
								imgWriter.setResponse(res);
								imgWriter.write(str);
								fileWriter.write(str);
						    });
							
							
						}
					}
				});
			});
		};
		img.onerror = function(){
			res.send("loading error");
		};
		img.src = __dirname+"/../img/"+'marker-green.png';
	}else{
		console.log("connection fail");
	}
}