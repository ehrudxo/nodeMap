//require
var   assert = require("assert")
	, adaptor = require("../../adaptor/database/pg/PostGisAdaptor")
	, barLayer = require("../../model/layer/bar")
	, layerReader = require("../../lib/reader/DBLayerReader");

layerReader.init( adaptor );
layerReader.read( barLayer, bBox, option );
