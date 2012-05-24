var Bar = require('../../../lib/model/layer/bar').Layer
	, Bounds = require('../../../lib/atomic/BaseTypes').Bounds
	, Styler = require('../../../lib/styler/Styler').Styler 
	, Condition = require('../../../lib/styler/Condition').Condition
	, Brush = require('../../../lib/styler/Brush').Brush
	, adaptor = require('../../../lib/adaptor/database/pg/PostGisAdaptor');

//bar.setExtent(new Bbox());
var style1 = new Styler({
	conditions : [new Condition({
		key : "dcb_se",
		comparator : "=",
		comparable : "1"
	})],
	brushes :[new Brush({strokeStyle : "orange"})]
});
var map = { name :"dummyMap" }
var bar = new Bar();
bar.setStyler( style1 );
bar.setAdaptor( adaptor );
bar.setMap( map );
console.log( "testBar" , bar );
bar.setExtent( new Bounds(194771.91,468728.68,208634.41,489833.53 ) ,function(){
	adaptor.end();
});
//var EventEmitter = require("events").EventEmitter;
//var util = require("util");
// 
//function A() {
//  A.super_.call(this); // not necessary, but it's neater to keep it there.
//  this.className = "classA";
//}
//util.inherits(A, EventEmitter);
// 
//function B() {
//  B.super_.call(this);
//  this.className = "classB";
//  this._register();
//}
//util.inherits(B, A);
//B.prototype._register = function() {
//  console.log("aa");
//}
// 
//function C() {
//  C.super_.call(this);
//};
//util.inherits(C, B);