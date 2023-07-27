const ytdl = require('discord-ytdl-core');

module.exports = {

    play: async function(message, queue, url) {
        validateRequest(message, queue, url);
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
async function validateRequest(message, queue, url) {
    const voiceChannel = message.member.voice.channel;
    if(!voiceChannel) {
        return message.channel.send("Join a voice channel to begin playing music.");
    }
    const permissions = voiceChannel.permissionsFor(message.client.user).toArray();
    if(!permissions.includes("Connect") || !permissions.includes("Speak")) {
        return message.channel.send("Missing connection or speaking privileges for this channel.");
    }
    let serverQueue = queue.get(message.guild.id);
    
    let songInfo;
    try{
        songInfo = await ytdl.getInfo(url);
    } catch(err) {
        return message.channel.send("Invalid youtube link: " + url);
    }

    const song = {
        title: songInfo.videoDetails.title,
        url: url,
    };

    if(!serverQueue) {
        return;
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        return message.channel.send(`${song.title} has been added to the queue!`);
    }

}

async function playSong() {

}