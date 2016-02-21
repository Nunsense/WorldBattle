var Game = require("../models/game.js");
var World = require("../world.js");

/*
	GET /api/games
*/
exports.index = function(req, res) {
	query = Game.find({});
	query.sort('-create_at');
	query.select('id create_at starts_at ends_at');
	query.exec(function(err, data) {
		res.json({
			status : 'OK',
			games : data
		});
	});
}

/*
	GET api/game/:id
*/
exports.detail = function(req, res) {
  var id = req.params.id;
  Game.findOne({ id:id }, function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send("There was an error on the game query");
    }

    if (data == null) {
      console.log("couldn't find that game!")
      return res.status(404).render('404.html');
    }

    res.json({ game : data });
  });
}

/*
	POST /api/games/create
*/
exports.create = function(req, res) {
	// var gameToSave = new Game({
  //   create_at: Date.now,
  //   starts_at: Date.now,
  //   ends_at: Date.now
	// });
  //
	// // save the game to the database
	// gameToSave.save(function(err,data){
	// 	if (err) {
	// 		// if there's an error on saving (perhaps a validation error?)
	// 		console.log("Error on saving the game");
	// 		console.log(err); // log out to Terminal all errors
  //
	// 		var templateData = {
	// 			pageTitle : 'Suggest a Product!',
	// 			errors : err.errors,
	// 			game : req.body
	// 		};
  //
	// 		// re-render the create page, but pass in the templateData
	// 		// this means the user will see the form with the data they already entered
	// 		res.render('create_form.html', templateData);
  //
	// 	} else {
	// 		console.log("Created a new game!");
	// 		console.log(data);
  //
	// 		// redirect to this new game's page
	// 		res.redirect('/game/'+ data.id);
	// 	}
	// });

  var grid = World.create(100, 100);
  World.run();

  res.json({ grid: grid });
};

/*
	POST /game/:id/edit
*/

//prepares and populates the form to edit a game
exports.join = function(req, res) {

	// Get game by its id in /game/:id/edit
	var requestedSlug = req.params.id;

	// query the database for that game with findOne, searching by its id
	// see http://mongoosejs.com/docs/api.html#model_Model.findOne
	Game.findOne({id:requestedSlug},function(err, data){

		if (err) {
			console.error("ERROR");
			console.error(err);
			res.send("There was an error querying for "+ requestedSlug).status(500);
		}

		if (data == null) {
			console.log("couldn't find that game!")
			return res.status(404).render('404.html');
		}

		if (data != null) {

			// prepare template data
			var templateData = {
				pageTitle: "Edit "+data.name,
				game: data
			};

			// render the edit form, passing in the existing values so the user can see them
			res.render('edit_form.html',templateData);

		}

	}) // end .findOne

}
/*
	GET /game/:id/delete
*/

// deletes a game with a given id
exports.deleteGame = function(req,res) {

	// Get game by its id in /game/:id/edit
	var requestedSlug = req.params.id;

	// remove the requested game based on its requestedSlug
	// http://mongoosejs.com/docs/api.html#model_Model-remove
	Game.remove({id:requestedSlug}, function(err){
		if (err){
			console.error(err);
			res.send("Error when trying to remove game: "+ requestedSlug);
		}

		res.send("Removed the game! <a href='/'>Back to home</a>.");
	});

};
