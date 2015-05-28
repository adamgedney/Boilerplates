module.exports.controller = function(){

	app.get('/', function(req, res) {
		res.render('charts', {data:'test data'});

	});

}//controller