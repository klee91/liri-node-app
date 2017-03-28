# LIRI Node Application

**LIRI** (short for *Language Interpretation and Recognition Interface*) is a simple Node command line application that takes in a command action/argument and will show 
media results, specifically for Twitter, Spotify and movies. This application currently has 4
different command actions: ```'my-tweets'```, ```'spotify-this-song'```, ```'movie-this'``` and ```'do-what-it-says'```.

The ```'my-tweets'``` command will show the last 20 tweets from user 'klee911', ```'spotify-this-song'```
will search information on the specified song under the Spotify database, ```'movie-this'``` will
search information on the specified movie using the [OMDB API](http://omdbapi.com/) database, and ```'do-what-it-says'``` will
read command in the **random.txt** file and run that command action. 

Several NPM packages were utilized:
- [```twitter```](https://www.npmjs.com/package/twitter)
- [```spotify```](https://www.npmjs.com/package/spotify)
- [```request```](https://www.npmjs.com/package/request)
- [```fs```](https://nodejs.org/docs/v0.3.1/api/fs.html)

Everything logged back to console with the application in terminal/bash, will be logged in the **log.txt** file.

----------------------------------------------------------------------------

Each command should be entered as follows:
```node liri.js '<command action>' '<title>'``` 

*Note: <title> is only necessary for the spotify and movie commands.
(e.g. node liri.js movie-this )