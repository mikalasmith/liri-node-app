require("dotenv").config();

var request = require("request");
var fs = require("fs-extra");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2]
var userInput = process.argv[3]


if (command === "my-tweets") {

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



if (command === "spotify-this-thing") {

    // code came from https://www.npmjs.com/package/node-spotify-api
    spotify.search(
        { type: "track", query: userInput || "All the Small Things", limit: 5 },
        function (err, data) {
            if (err) {
                return console.log("Error occurred: " + err);
            }

            for (var i = 0; i < data.tracks.items.length; i++) {
                // console.log(data.tracks.items.length);
                //console.log(data.tracks.items[i]);
                var firstTrack = data.tracks.items[i]; 1
                // console.log(data);
                console.log(
                    "------------------------------------------------------------------"
                );
                console.log("Artist: " + firstTrack.artists[0].name);
                console.log("Song Title: " + firstTrack.name);
                console.log("From album: " + firstTrack.album.name);
                console.log("Song Preview: " + firstTrack.external_urls.spotify);
                console.log(
                    "------------------------------------------------------------------"
                );
            }


        }

    );
}

if (command === "movie-this") {
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log(JSON.parse(body))
            console.log(
                "------------------------------------------------------------------"
            );
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).imdbRating);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Ratings: " + JSON.parse(body).Ratings[0].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log(
                "------------------------------------------------------------------"
            );


        }
    });

}

if (command === "do-what-it-says") {
    fs.readFile("random.txt", "UTF8", function (err, data) {
        console.log(data);
        //split the data and 

        var myArray = data.split(",")
        console.log(myArray)
        spotify.search(
            { type: "track", query: myArray[1] || "All the Small Things", limit: 5 },
            function (err, data) {
                if (err) {
                    return console.log("Error occurred: " + err);
                }

                for (var i = 0; i < data.tracks.items.length; i++) {
                    // console.log(data.tracks.items.length);
                    //console.log(data.tracks.items[i]);
                    var firstTrack = data.tracks.items[i]; 1
                    // console.log(data);
                    console.log(
                        "------------------------------------------------------------------"
                    );
                    console.log("Artist: " + firstTrack.artists[0].name);
                    console.log("Song Title: " + firstTrack.name);
                    console.log("From album: " + firstTrack.album.name);
                    console.log("Song Preview: " + firstTrack.external_urls.spotify);
                    console.log(
                        "------------------------------------------------------------------"
                    );
                }


            }

        );
    })
}
