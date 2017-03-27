var twitter = require('./keys.js')

var consumerKey = twitter.twitterKeys.consumer_key;
var consumerSecret = twitter.twitterKeys.consumer_secret;
var accessTokenKey = twitter.twitterKeys.access_token_key;
var accessTokenSecret = twitter.twitterKeys.access_token_secret;

// console.log(twitter.twitterKeys);

var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: consumerKey,
	consumer_secret: consumerSecret,
	access_token_key: accessTokenKey,
	access_token_secret: accessTokenSecret
});

var spotify = require('spotify');

var request = require('request');

var fs = require('fs');

console.log(process.argv)

var action = process.argv[2];
var title = process.argv[3];

switch (action) {
	case 'my-tweets':
		myTweets();
	break;
	case 'spotify-this-song':
		spotifySearch();
	break;
	case 'movie-this':
		movie();
	break;
	case 'do-what-it-says':
		fs.readFile("random.txt" , "utf8" , function(error, data) {
			if(error) {
				console.log(error);
				append(error);
			} else {
				dataArr = data.split(",");

				var a = dataArr[0];
				title = dataArr[1];
				
				switch(a) {
					case 'my-tweets':
						myTweets();
					break;
					case 'spotify-this-song':
						spotifySearch();
					break;
					case 'movie-this':
						movie();
					break;
					default:
					console.log("File requires an action: 'my-tweets', 'spotify-this-song', or 'movie-this'");
					append("File requires an action: 'my-tweets', 'spotify-this-song', or 'movie-this'");
				}
			}
		});
	break;
	default:
		console.log("Please put in an action: 'my-tweets', 'spotify-this-song', 'movie-this' or 'do-what-it-says'");
		append("Please put in an action: 'my-tweets', 'spotify-this-song', 'movie-this' or 'do-what-it-says'");
};

//tweets function
function myTweets() {
	//show last 20 tweets and when they were created
	var params = {screen_name: 'klee911'};
	client.get('statuses/user_timeline', params, function(error,tweets, response) {
		if (error) {
			console.log(error);
			append(error);
		} else {
			for (var i = 0 ; i < tweets.length ; i++) {
				console.log(tweets[i].text);
				append(tweets[i].text);
			}
			console.log("-------------------------------------------------------------------------------------");
			append("-------------------------------------------------------------------------------------");
		}
	});
};

//spotify function
function spotifySearch() {
	//show song's artist(s), song name, preview link of song from spotify,
	//and the album that the song is from
	//if no song is provided, default to "The Sign" by Ace of Base

	if (title == null || undefined) {
  		title = "The Sign by Ace of Base"
	} 

	spotify.search({ type: 'track', query: title }, function(error, data) {
	    if ( error ) {
	        console.log( error);
	        append(error);
	    }

	    if(title = '') {
		    	console.log("Please put in a song/track!");
		    } else {
		    	console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
		    	console.log("Track: " + data.tracks.items[0].name);
		    	console.log("Track Preview: " + data.tracks.items[0].preview_url);
		    	console.log("Album: " + data.tracks.items[0].album.name);
		    	console.log("-------------------------------------------------------------------------------------");

		    	append("Artist(s): " + data.tracks.items[0].album.artists[0].name);
		    	append("Track: " + data.tracks.items[0].name);
		    	append("Track Preview: " + data.tracks.items[0].preview_url);
		    	append("Album: " + data.tracks.items[0].album.name);
		    	append("-------------------------------------------------------------------------------------");
	    }	
	});
};

//movie function
function movie() {
	//default to Mr. Nobody
  if (title == null || undefined) {
  		title = "Mr.Nobody"
  } else {
  		title = title.split(" ").join("+");
  };

  var url = "http://www.omdbapi.com/?t=" + title + "&tomatoes=true";
  request(url , function(error,response,body) {
  	if (error) {
        console.log(error);
        append(error);
    }
  	if (!error && response.statusCode === 200) {

  		console.log("Title: " + JSON.parse(body).Title);
		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		console.log("Country: " + JSON.parse(body).Country);
		console.log("Language: " + JSON.parse(body).Language);
		console.log("Plot: " + JSON.parse(body).Plot);
		console.log("Actors: " + JSON.parse(body).Actors);
		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
		console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
		console.log("-------------------------------------------------------------------------------------");

		append("Title: " + JSON.parse(body).Title);
		append("IMDB Rating: " + JSON.parse(body).imdbRating);
		append("Country: " + JSON.parse(body).Country);
		append("Language: " + JSON.parse(body).Language);
		append("Plot: " + JSON.parse(body).Plot);
		append("Actors: " + JSON.parse(body).Actors);
		append("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
		append("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
		append("-------------------------------------------------------------------------------------");
  	}
  })
}
	
//append function	
function append(text) {
	fs.appendFile("log.txt", text + "\n" , function(error) {
		if (error) {
			console.log(error);
		}
	});
}
