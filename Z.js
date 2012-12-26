/**
 * The Extend function
 * @param  {[type]} subClass    [description]
 * @param  {[type]} supperClass [description]
 * @return {[type]}             [description]
 */
function extend(subClass,supperClass){
	var F=function(){};
	F.prototype=supperClass.prototype;
	subClass.prototype=new F();
	subClass.prototype.constructor=subClass; 
	subClass.supperClass=supperClass.prototype; 
	if(supperClass.prototype.constructor==Object.prototype.constructor){
		supperClass.prototype.constructor=supperClass;
	}
	return subClass;
}