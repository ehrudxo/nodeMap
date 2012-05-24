var util = require('util');
var events = require('events');
var SuperLayer = require("../Layer").Layer;

var self = exports.Layer = function(){
	SuperLayer.call(this);
	this.name  = "bar";
	this.type  = "dbAdaptor";
	this.cols  = ["gid","sf_team_co","hgo_sno","snt_uptae_","upso_nm","dcb_se","hgo_frst_c","frst_regr_","hgo_last_m","last_cort_"];
	this.rows  = [];
	this.imagePath = __dirname+"/../../../img/"+'marker-green.png';
	this.className = "kr.osgeo.nodeMap.model.layer.Bar";
};
util.inherits( self, SuperLayer );
 