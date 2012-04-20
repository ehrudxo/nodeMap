var source,adaptor;
var setAdaptor = exports.setAdaptor = function( sourceIn, adaptorIn ){
	source 	= sourceIn;
	adaptor = adaptorIn;
};
var create = exports.create = function create( callback ){
	adaptor.create( source , callback );	
};
var insert = exports.insert = function insert( callback ){
	adaptor.insertRows( source , callback );
};