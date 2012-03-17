/**
 * 
 */
var FeatureCollection = exports.FeatureCollection = function(){
	this.type = "FeatureCollection";
	this.bbox = null;
	this.features = [];
	this.className = "nodeMap.protocol.geoJson.GeoJSON.FeatureCollection";
};

/**
 * 
 */
var Feature = exports.Feature = function(geometry){
	this.type = "Feature";
	this.bbox = null;
	this.geometry={};
	if(geometry){
		this.geometry.type = geometry.type;
		this.geometry.coordinates = geometry.coordinates;
		this.geometry.className = geometry.className;
	}
	this.className = "nodeMap.protocol.geoJson.GeoJSON.Feature";
};

/**
 * 
 */
var Point = exports.Point = function(coordinates){
	this.type ="Point";
	if(coordinates)
		this.coordinates = coordinates;
	else
		this.coordinates = [];
	this.className = "nodeMap.protocol.geoJson.GeoJSON.Point";
};
/**
 * 
 */
var LineString = exports.LineString = function(coordinates){
	this.type ="LineString";
	this.coordinates = coordinates;
	if(coordinates)
		this.coordinates = coordinates;
	else
		this.coordinates = [];
	this.className = "nodeMap.protocol.geoJson.GeoJSON.LineString";
};
/**
 * 
 */
var Polygon = exports.Polygon = function(coordinates){
	this.type ="Polygon";
	this.coordinates = coordinates;
	if(coordinates)
		this.coordinates = coordinates;
	else
		this.coordinates = [];
	this.className = "nodeMap.protocol.geoJson.GeoJSON.Polygon";
};

/**
 * 
 */
var MultiPoint = exports.MultiPoint = function(coordinates){
	this.type ="MultiPoint";
	if(coordinates)
		this.coordinates = coordinates;
	else
		this.coordinates = [];
	this.className = "nodeMap.protocol.geoJson.GeoJSON.MultiPoint";
};
/**
 * 
 */
var MultiLineString = exports.MultiLineString = function(coordinates){
	this.type ="MultiLineString";
	this.coordinates = coordinates;
	if(coordinates)
		this.coordinates = coordinates;
	else
		this.coordinates = [];
	this.className = "nodeMap.protocol.geoJson.GeoJSON.MultiLineString";
};
/**
 * 
 */
var MultiPolygon = exports.MultiPolygon = function(coordinates){
	this.type ="MultiPolygon";
	this.coordinates = coordinates;
	if(coordinates)
		this.coordinates = coordinates;
	else
		this.coordinates = [];
	this.className = "nodeMap.protocol.geoJson.GeoJSON.MultiPolygon";
};

/**
 * 
 */
var GeometryCollection = exports.GeometryCollection = function(geometries){
	this.type ="GeometryCollection";
	this.geometries ={};
	if(geometries)
		this.geometries =geometries; 
	this.className = "nodeMap.protocol.geoJson.GeoJSON.GeometryCollection";
};