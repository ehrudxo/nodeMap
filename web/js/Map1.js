var layer = new nodeMap.Layer("imgSvc","/canvas/imgSvc/",{
	       layers: "dbAdaptor-bar-0",
	       transparent: true
	   }, {
	       opacity: 1,
	       singleTile: true
	   });
var baseoption = {
		type: 'png', 
		displayOutsideMaxExtent: false,
		buffer:1,
		transitionEffect:'resize',
		isBaseLayer :true
};
var tile = new nodeMap.Tile("기본지도",nodeMap.url+"/1.0.0/basic/",baseoption);
OpenLayers.ImgPath = "../../img/";
var map = new OpenLayers.Map({
    div: "map",
    controls: [new OpenLayers.Control.Attribution(),
               new OpenLayers.Control.TouchNavigation({
                   dragPanOptions: {
                       enableKinetic: true
                   }
               }),
               new OpenLayers.Control.ZoomPanel()],
	projection: new OpenLayers.Projection("EPSG:900913"),
    displayProjection: new OpenLayers.Projection("EPSG:4326"),
    units: "m",
    numZoomLevels: 19,
    maxResolution: 156543.0339,
    maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34,
                                      20037508.34, 20037508.34)
});
map.addLayer( tile );
map.setBaseLayer( tile );
map.addLayer( layer );

var p1 = new Proj4js.Point(14142665.637101248,4549589.199757916);   //any object will do as long as it has 'x' and 'y' properties
var p2 = new Proj4js.Point(14152665.637101248,4550589.199757916);
var zoomBounds = new OpenLayers.Bounds(p1.x,p1.y,p2.x,p2.y);
map.zoomToExtent(zoomBounds);