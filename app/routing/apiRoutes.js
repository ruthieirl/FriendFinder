//Set dependent packages
var path = require("path");
var friends = require("../data/friends.js");

//Routes
module.exports = function(app) {

	//create an api.get route to display JSON of all possible friends
	app.get("api/friends", function(req, res) {
		res.JSON(friends);
		console.log(friends);
	});

	//create an api.post route to handle incoming survey results
	//handle compatibility logic here
	app.post("api/friends", function(req, res) {

	});

};