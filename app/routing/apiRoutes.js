//Set dependent packages
var path = require("path");
var friends = require("../data/friends.js");

//Routes
module.exports = function(app) {
	
	//create an api.get route to display JSON of all possible friends
	app.get('/api/friends', function(req, res) {
		res.json(friends);
		console.log(friends);
		//BREAKS RIGHT HERE. I GET AN EMPTY ARRAY FOR MY FRIENDS.
	});

	//create an api.post route to handle incoming survey results
	//handle compatibility logic here
	//NONE OF THIS RUNS SO I DON'T KNOW IF ANY OF IT WORKS
	app.post("/api/friends", function(req, res) {
		console.log("help");
		var newSurvey = req.body;
		
		console.log(newSurvey);

		var newFriendArray = [];
		
		for (var i = 0; i < friends.length; i++) {
			var scoreDifference = 0;

			for (var k = 0; k < friends[i].scores.length; k++) {
				var difference = Math.abs(friends[i].scores[k] - newSurvey.scores[k]);
				scoreDifference += difference;
			}

			newFriendArray.push({
				name: friends[i].name,
				photo: friends[i].photo,
				totalDiff: scoreDifference,
			});
			console.log(friends[i].name);
			console.log(friends[i].photo)
		}	
	
		var highestScore = 50;
		
		for (var i = 0; i < newFriendArray.length; i++) {
			if (newFriendArray[i].totalDiff < highestScore) {
				highestScore = newFriendArray[i].totalDiff;
			}
		}

		console.log(highestScore);
		var pickedFriend = {};

		for (var i = 0; i < newFriendArray.length; i++) {
			if (newFriendArray[i].totalDiff === highestScore) {
				pickedFriend = newFriendArray[i];
			}
		}
		res.JSON(pickedFriend);
		friends.push(newSurvey);
		console.log(pickedFriend.name);
		console.log(pickedFriend.photo);
	});

};

