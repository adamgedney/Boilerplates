var mongoose 		= require('mongoose');
var db 				= mongoose.connection;
var feastSchema 	= mongoose.Schema({
	feast	: String,
	type	: String,
	rank	: String,
	fullDate: String,
	year	: Number,
	month	: Number,
	day		: Number,
	weekDay : String

});

var Feast = mongoose.model('Feast', feastSchema);




//======================================//
//Create feast entry
//======================================//
exports.add = function(obj, cb){
	db.close();
	dbReady(function(){
		var entry = new Feast({
			feast	: obj.feast,
			type	: obj.type,
			rank	: obj.rank,
			fullDate: new Date(obj.fullDate).toUTCString(),
			year	: obj.year,
			month	: obj.month,
			day		: obj.day,
			weekDay : obj.weekDay

		});

		entry.save(function(err, entry){
			db.close();
			cb(entry);
		});
		// cb(entry);
	});
}//create










//======================================//
//Get pascha for requested year
//======================================//
exports.pascha = function(year, cb){
db.close();
	dbReady(function(){
		Feast.find({year: year, feast: 'Pascha'}, function(err, doc){
			db.close();
			cb(doc);
		});
	});
}//retrieve



















//Connect and announce ready state
function dbReady(callback){
	mongoose.connect('mongodb://adam:143icxc@kahana.mongohq.com:10069/services');
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(){
		callback();
	});
}






