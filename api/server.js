const express = require("express");
const server = express();
const RPC = require("discord-rpc");
const axios = require("axios");
const child_process = require("child_process");
const _ = require("underscore");

const unparsedToken = require("../token.json");

//Initialze Rich Presence Variables
let access_token = unparsedToken["access_token"],
song_title,
album_title,
artist_name,
now = Date.now();

// Creates a sleep function for pausing functions where async is not applicable
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Gets user listening history and sets Rich Presence Variables based on the most recently played song.
const getSong = () => {
    return axios
        .get(`http://api.deezer.com/user/me/history?access_token=${ access_token }&index=0&limit=1`)
        .then(async res => {
            if(res.data.error || _.isEmpty(unparsedToken)) {
                console.log("Attempted authorization with a bad token.");
                console.log("Retrieving new token.");
                child_process.spawn("runner.bat");
                await sleep(60000)
                    .then(() => access_token = unparsedToken["access_token"])
                    .then(() => console.log("token acquired"))
                    .finally(() => getSong());
            } else { 
            return axios
                .get(`https://api.deezer.com/track/${ res.data.data[0].id }`)
                .then(res => {
                    song_title = res.data.title,
                    album_title = res.data.album.title,
                    artist_name = res.data.artist.name,
                    song_duration = res.data.duration * 86400;
                });
            }
        });
};

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
const wait = async () => { 
    console.log("Making preperations...");
    getSong().then(() => setActivity())
    setInterval(() => {
        getSong()
            .then(() => {
                setActivity();
            });
    }, 30000);
};
client.on("ready", () => {
    wait();
});
// Log in to RPC with client id
// Initializes the rich presence connection from this api to the user's Discord account
client.login({ clientId: "709635687820820520"})
    .catch((error) => {
        if(error.message === "Could not connect"){
            console.log("Open Discord, then type \"rs\" and press ENTER.")
        } else if (error.message === "RPC_CONNECTION_TIMEOUT"){
            console.log("Reopen Discord, then type \"rs\" and press ENTER.")
        }
    });      

server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({ message: "up" });
})

// API endpoint for Auth redirect URI 
server.get("/redirect", (req, res) => {
    res.status(200).sendFile(__dirname + "/index.html");
})
module.exports = server