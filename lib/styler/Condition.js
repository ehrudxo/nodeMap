var key=exports.key,value=exports.value,comparator=exports.comparator;
var Condition = exports.Condition = function(option){
	if( typeof option !=="undefined"){
		this.key = option.key;
		this.comparator = option.comparator;
		this.comparable = option.comparable;
	}
	this.toString = function(){
		if(this.comparable == "null")
			return this.key + " " +this.comparator + " "+ this.comparable;
		else
			return this.key + " " +this.comparator + " '"+ this.comparable+"'";	
	}
}
var assert = exports.assert = function(value,comparator,comparable){
	var mask = false;
	switch (comparator) {
	case "and":
		mask = value && comparable;
		break;
	case "&&":
		mask = value && comparable;
		break;
	case "or":
		mask = value || comparable;
		break;
	case "||":
		mask = value || comparable;
		break;
	case "not":
		mask = !value;
		break;
	case "!":
		mask = !value ;
		break;
	case ">":
		mask = value > comparable;
		break;
	case "<":
		mask = value < comparable;
		break;
	case ">=":
		mask = value >= comparable;
		break;
	case "<=":
		mask = value <= comparable;
		break;
	case "<>":
		mask = value != comparable;
		break;
	case "==":
		mask = value == comparable;
		break;
	case "=":
		mask = value == comparable;
		break;
	case "!=":
		mask = value != comparable;
		break;
	case "is null":
		mask = !value;
		break;
	case "is not null":
		mask = !(!value);
		break;
	default:
		break;
	}
	return mask;
}