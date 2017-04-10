//All global variables
var fs = require('fs');
var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var userInput = process.argv[2];
var value = process.argv[3];
// Section for commands
function checkUserInput(userInput, value) {
    switch (userInput) {
        case "my-tweets":
            twitter();
            break;
        case "spotify-this-song":
            spotifyThis(value);
            break;
        case "movie-this":
            movie(value);
            break;
        case "do-what-it-says":
            whatItSays();
            break;
    };
};
// Section for twitter
var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
});
function twitter() {
    var params = { screen_name: '@nicolepolakk', count: '20' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        };
    });
};
checkUserInput(userInput, value);
// Section for spotify
function spotifyThis(songs) {
    spotify.search({ type: 'track', query: songs }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        };
        console.log(data);
        var items = data.tracks.items;
        for (i = 0; i < items.length; ++i) {
            console.log("Song Name: " + items[i].name);
            console.log("Number of albums with this track: " + items.length);
            console.log("Preview Link of the song on Spotify: " + items[i].preview_url);
            console.log("Album Name: " + items[i].album.name);
            console.log(+items[i].artists.length);

           	saveToDocument("Song Name: " + items[i].name);
           	saveToDocument("Number of albums with this track: " + items.length);
           	saveToDocument("Preview Link of the song on Spotify: " + items[i].preview_url);
           	saveToDocument("Album Name: " + items[i].album.name);
           	saveToDocument(+items[i].artists.length);
        };
    });
};
// Section for movie piece
function movie(whatMovie) {
    request('http://www.omdbapi.com/?t=' + whatMovie + '&y=&plot=short&r=json', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            console.log("Title: " + json.Title);
            console.log("Year: " + json.Year);
            console.log("IMDB Rating: " + json.imdbRating);
            console.log("Country: " + json.Country);
            console.log("Language: " + json.Language);
            console.log("Plot: " + json.Plot);
            console.log("Actors: " + json.Actors);
            console.log("Rotten Tomatoes rating: " + json.tomatoRating);
            console.log("Rotten Tomatoes URL: " + json.tomatoURL);

            saveToDocument("Title: " + json.Title);
            saveToDocument("Year: " + json.Year);
            saveToDocument("IMDB Rating: " + json.imdbRating);
            saveToDocument("Country: " + json.Country);
            saveToDocument("Language: " + json.Language);
            saveToDocument("Plot: " + json.Plot);
            saveToDocument("Actors: " + json.Actors);
            saveToDocument("Rotten Tomatoes rating: " + json.tomatoRating);
            saveToDocument("Rotten Tomatoes URL: " + json.tomatoURL);
        };
    });
};
// Section for whatItSays piece
function whatItSays() {
    fs.readFile("random.txt", "utf-8", function read(err, data) {
        if (err) {
            return console.log(err);
        };
        if (data.indexOf(",") > 0) {
            var myOwnProcessArgv = data.split(",");
            value = myOwnProcessArgv[1];
            userInput = myOwnProcessArgv[0];
        };
        checkUserInput(userInput, value);
    });
};
// Function to save to file
function saveToDocument(string){
	fs.appendFile('output.txt', string, function(err) {
		  if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
};
});
};