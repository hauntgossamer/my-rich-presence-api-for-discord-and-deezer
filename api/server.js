const express = require("express");
const server = express();
const RPC = require("discord-rpc");

const start = Date.now();
const currentSong = "Strange Terrain";
const currentArtist = "Circa Survive";
const currentSongLength = 243;
const endTimeStamp = Date.now() + currentSongLength;
 
const client = new RPC.Client({ transport: 'ipc' });

client.on("ready", () => {
    setInterval(() => client.setActivity({
        details: `Listening to: ${ currentSong } (this is a placeholder; soon I will render the currently playing song)`,
        state: `by ${ currentArtist } (another placeholder; soon to be the currently playing artist)`,
        startTimestamp: start,
        largeImageKey: `${ process.env.LARGE_IMAGE_KEY }`,
        smallImageKey: "null",
        instance: false,
    }), currentSongLength)
})

 
// Log in to RPC with client id
client.login({ clientId: `${ process.env.CLIENT_ID }`, clientSecret: `${ process.env.CLIENT_SECRET }` }).catch((error) => console.error("error logging in", error));  

server.get("/", (req, res) => {
    res.status(200).json({ message: "up" })
})
server.get("/redirect", (req, res) => {
    res.status(200).sendFile(__dirname + "/index.html")
})
module.exports = server;