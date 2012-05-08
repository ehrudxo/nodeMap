var NodeMap = function( ){
	this.url = "http://152.99.104.24/tcpor/tile/900913/"
};
NodeMap.prototype.Tile = OpenLayers.Class(OpenLayers.Layer.TMS,{
	/** @lends MapCluster.Layer.BaseTileLayer# */
	getURL: function(bounds) {
		var res = this.map.getResolution();
	    var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	    var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
	    var z = this.map.getZoom();
	    var limit = Math.pow(2, z);
	    if (y < 0 || y >= limit) {
	        return AlThree.imagePath + "404.png";
	    } else {
	        x = ((x % limit) + limit) % limit;
	        return this.url + z + "/" + x + "/" + y + "." + this.type;
	    }
	},
	className: "AlThree.Layer.Tile"
});
NodeMap.prototype.Layer = OpenLayers.Class(OpenLayers.Layer.WMS,{
	/** @lends MapCluster.Layer.BaseTileLayer# */
	getURL: function(bounds) {
		bounds = this.adjustBounds(bounds);
		
		
        var imageSize = this.getImageSize(); 
        if (parseFloat(this.params.VERSION) >= 1.3) {  
        	               // currently there is no way to ask proj4js for the axes order  
        	               // so this is what we assume: if the projection is an EPSG code  
        	               // >= 4000 and < 5000 the axes order is Latitude Longitude instead  
        	               // of Longitude Latitude (or X Y).  
           var projection = this.map.getProjection();  
           var projArray = projection.split(":");  
           var prefix = projArray[0];  
           var code = parseInt(projArray[1]);  
	       if (prefix.toUpperCase() === 'EPSG' && code >= 4000 &&   
	               code < 5000) {  
	                   bounds = bounds.swapAxisOrder();  
	       }  
       }
       console.log(bounds);
       var ba = bounds.toArray();
       var source = new Proj4js.Proj("EPSG:3785");    //source coordinates will be in Longitude/Latitude
       var dest = new Proj4js.Proj("EPSG:5181");     //destination coordinates in LCC, south of France
       var p1 = new Proj4js.Point(ba[0],ba[1]);   //any object will do as long as it has 'x' and 'y' properties
       var p2 = new Proj4js.Point(ba[2],ba[3]);
       Proj4js.transform(source, dest, p1);  
       Proj4js.transform(source, dest, p2);  
       
//	   var _mapBounds = this.params.LAYERS+","+imageSize.w+","+imageSize.h+","+(this.encodeBBOX ?  bounds.toBBOX() : bounds.toArray());
       var _mapBounds = this.params.LAYERS+","+imageSize.w+","+imageSize.h+","+p1.x+","+p1.y+","+p2.x+","+p2.y;
       return this.url+ _mapBounds;
	},
	className: "AlThree.Layer.BaseTileLayer"
});
var nodeMap = new NodeMap();

//  var layer = new BaseTileLayer("기본지도",AlThree.Settings.tileUrl+"/1.0.0/basic/",baseoption);