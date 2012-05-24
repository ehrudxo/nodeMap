var util 				= require('util')
	, defaultCondition	= new (require('./Condition').Condition)( {key : 1,comparator : '=',comparable : 1} )
	, defaultBrush		= new (require('./Brush').Brush)();
	
var Styler = exports.Styler = function(option){
	this.conditions = undefined;
	this.brushes = undefined;
	if( typeof option !== "undefined" ){
		if( typeof option.conditions !== "undefined" && util.isArray(option.conditions)){
			this.conditions = option.conditions;
		}else{
			this.conditions = [ defaultCondition ];
		}
		if( typeof option.brushes !== "undefined" && util.isArray(option.brushes)){
			this.brushes = option.brushes;
		}else{
			this.brushes = [ defaultBrush ];
		}
	}
	/*
	 * actually conditionId means array number.It makes faster.
	 */
	this.getBrushByCondition = function( conditionId ){
		return this.brushes[conditionId];
	}
}
 
