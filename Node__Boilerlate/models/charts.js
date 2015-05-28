var mongoose 		= require('mongoose');
var db 				= mongoose.connection;
var chartSchema 	= mongoose.Schema({
	chart	: String,
	created_at : String
});

var Chart = mongoose.model('chart', chartSchema);




//======================================//
//Create chart entry
//======================================//
exports.add = function(obj, cb){

	var entry = new chart({
		chart	: obj.chart,
		created_at: new Date(obj.fullDate).toUTCString(),
	});

	entry.save(function(err, entry){
		db.close();
		cb(entry);
	});

}//add



