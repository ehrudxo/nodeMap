var adaptor 
/**
 * 
 */
var init = exports.init = function init( adaptorIn ){
	adaptor = adaptorIn;
}
/**
 * read
 * @param layer 
 */
var read = exports.read = function read( layer,bBox,option ){
	layer.setAdaptor(adaptor);
	layer.read(bBox,options);
}