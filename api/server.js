const express = require("express");
const server = express();
const RPC = require("discord-rpc");
const axios = require("axios");

//Initialze Rich Presence Variables
let now = Date.now(),
access_token,
song_title,
album_title,
artist_name;

//Gets user listening history and sets Rich Presence Variables based on the most recently played song.
const getSong = () => {
    return axios
        .get(`http://api.deezer.com/user/me/history?access_token=${ access_token }&index=0&limit=1`)
        .then(res => {
            return axios
                .get(`https://api.deezer.com/track/${ res.data.data[0].id }`)
                .then(res => {
                    song_title = res.data.title,
                    album_title = res.data.album.title,
                    artist_name = res.data.artist.name;
                });
        });
}

// Functions which return the data used in rich presence update
const details = () => `Recently listened to : ${ song_title }`
const state = () => `by ${ artist_name }, on ${ album_title }`;

// Function which sets the user's rich presence based on listening history from the user's Deezer account
const setActivity = async () => {
            await client.setActivity({
                details: details(),
                state: state(),
                startTimestamp: now,
                largeImageKey: "deezer_logo",
                smallImageKey: "null",
                instance: false,
            })
                .then(() => console.log(`set Activity, song title: ${ song_title }, album title: ${ album_title }, artist name: ${ artist_name }`))
                .catch(err => console.error(err));
};

// Sets up the rich presence connection from this api to the user's Discord account
const client = new RPC.Client({ transport: 'ipc' });

// Function that dicord-rpc runs in order to set rich presence for the user
const wait = () => { 
    if (typeof(access_token) === "undefined"){
        console.log("waiting for token");
        setTimeout(wait, 5000);
    } else {
        getSong()
            .then(() => {
                setActivity();
                setInterval(() => {
                    getSong()
                        .then(() => {
                            setActivity();
                            setTimeout(getSong, 15000);
                        });
                }, 15000)
            });
    };
};
client.on("ready", () => {
    wait();
});
 
// Log in to RPC with client id
// Initializes the rich presence connection from this api to the user's Discord account
client.login({ clientId: "709635687820820520"}).catch((error) => console.error("error logging in", error));  

server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({ message: "up" });
})

server.post("/token", (req, res) => {
    access_token = req.body.token;
    res.status(200).json({ message: "token recieved" });
})

// API endpoint for Auth redirect URI 
server.get("/redirect", (req, res) => {
    res.status(200).sendFile(__dirname + "/index.html");
})
module.exports = server;