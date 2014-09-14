module.exports.controller = function(app){
var app 		= require('../app');
var psalter		= require('../models/psalter');


	app.post('/action_add_psalm', function(req, res) {
		var obj = {};
			obj.number 	= req.body.num;
			obj.text 	= req.body.text;
			obj.stasis 	= req.body.stasis;
			obj.kathisma= req.body.kathisma;


		psalter.add(obj, function(result){
			console.log(result);
			res.redirect('/psalter');
		});



	});

}