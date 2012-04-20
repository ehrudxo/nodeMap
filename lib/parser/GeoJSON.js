var GeoJSON = require('../protocol/geoJson/GeoJSON')
	, PointGeoJSON = GeoJSON.Point
	, LineGeoJSON = GeoJSON.LineString
	, PolygonGeoJSON = GeoJSON.Polygon
	, Feature = GeoJSON.Feature
	, FeatureCollection = GeoJSON.FeatureCollection;

var obj = exports.obj = function(record){
	this.featureCollection = new FeatureCollection();
	
	this.getParsedColection = function( header ){
		this.featureCollection.bbox = header.getBounds();
		return this.featureCollection;
	};
	this.getParsedRecord = function( record , fields, dbfSingleRow ){
		var GeoJSONObject = record.geometryType == "POINT"?PointGeoJSON : 
						(record.geometryType == "POLYLINE"?LineGeoJSON :
							(record.geometryType == "POLYGON"?PolygonGeoJSON :null 
							));
		var feature = new Feature( new GeoJSONObject( record.coordinates ) );
		feature.sequence = record.recordNumber;
		if(record.geometryType == "POINT"){
			delete feature["bbox"];
		}else{
			feature.bbox = [record.bbox.minx,record.bbox.miny,record.bbox.maxx, record.bbox.maxy];
		}
        this.featureCollection.features.push(feature);
        if( typeof fields === "object" && typeof dbfSingleRow === "object" ){
        	feature["properties"]={};
        	var i=0,len;
        	for(i=0,len= fields.length;i<len;i+=1){
        		feature["properties"][fields[i]["name"]] = dbfSingleRow[fields[i]["name"]];
        	}
        }
        return feature;
	};
	this.parseCollection = function(){
		
	};
};
var className = exports.className ="nodeMap.parser.GeoJSON";