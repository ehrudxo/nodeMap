var Bar = require('../../../lib/model/layer/bar').Layer
	, Bounds = require('../../../lib/atomic/BaseTypes').Bounds
	, adaptor = require('../../../lib/adaptor/database/pg/PostGisAdaptor');

//bar.setExtent(new Bbox());
var bar = new Bar();
bar.setAdaptor( adaptor );
console.log( "testBar" , bar );
bar.setExtent( new Bounds(194771.91,468728.68,208634.41,489833.53 ) );
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