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
	        return OpenLayers.imagePath + "404.png";
	    } else {
	        x = ((x % limit) + limit) % limit;
	        return this.url + z + "/" + x + "/" + y + "." + this.type;
	    }
	},
	className: "NodeMap.client.Layer.Tile"
});
NodeMap.prototype.Layer = OpenLayers.Class(OpenLayers.Layer.WMS,{
	getURL: function(bounds) {
		bounds = this.adjustBounds(bounds);
        var imageSize = this.getImageSize(); 
        if (parseFloat(this.params.VERSION) >= 1.3) {  
           var projection = this.map.getProjection();  
           var projArray = projection.split(":");  
           var prefix = projArray[0];  
           var code = parseInt(projArray[1]);  
	       if (prefix.toUpperCase() === 'EPSG' && code >= 4000 &&   
	               code < 5000) {  
	                   bounds = bounds.swapAxisOrder();  
	       }  
       }
       var dest = new OpenLayers.Projection("EPSG:5181");
       bounds = bounds.transform( map.projection, dest);
       var ba = bounds.toArray();
	   var _mapBounds = this.params.LAYERS+","+imageSize.w+","+imageSize.h+","+(this.encodeBBOX ?  bounds.toBBOX() : bounds.toArray());
       return this.url+ _mapBounds;
	},
	className: "NodeMap.client.Layer.ImageLayer"
});
var nodeMap = new NodeMap();

//  var layer = new BaseTileLayer("기본지도",AlThree.Settings.tileUrl+"/1.0.0/basic/",baseoption);