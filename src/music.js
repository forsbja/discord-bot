const ytdl = require('discord-ytdl-core');

module.exports = {

    play: async function(message, serverQueue, url) {
        validateRequest(message, serverQueue, url);
    },

    skip: async function(message) {

    },

    pause: async function(message) {

    },
}

/**
 * Takes the message and url. If the caller is in a reachable
 * voice channel, the bot will check for an existing video. If
 * it exists, then it will add it to the queue and play.
 * @param {*} message 
 * @param {*} serverQueue 
 * @param {*} url
 */
async function validateRequest(message, serverQueue, url) {
    const voiceChannel = message.member.voice.channel;
    if(!voiceChannel) {
        return message.channel.send("Join a voice channel to begin playing music.");
    }
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if(!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send("Missing connection or speaking privileges for this channel.");
    }
    console.log("made it")
}

async function playSong() {

}