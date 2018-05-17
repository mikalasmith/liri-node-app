require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var command = process.argv[2]


if (command === "my-tweets") {

    var client = new Twitter({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret
    });

    var params = { screen_name: 'mikalacoder' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            console.log(error);
        } else if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text)
            }

        }
    });

}

if (command === "spotify-this-song") {

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret,
    });

    function spotifyIt() {
        spotify.search({ type: 'track', query: command[3] }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;  //from spotify npm docs
            }
            else {
                var songInfo = data.tracks.items[0];
                var songResult = console.log(songInfo.artists[0].name)
                console.log(songInfo.name)
                console.log(songInfo.album.name)
                console.log(songInfo.preview_url)
                console.log(songResult);
            };
        });
    }
}
spotifyIt();



