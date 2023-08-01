const ytdl = require('discord-ytdl-core');
const {VoiceConnectionStatus, AudioPlayerStatus, createAudioPlayer, joinVoiceChannel, createAudioResource } = require('@discordjs/voice');


module.exports = {

    play: async function (message, queue, url) {
        validateRequest(message, queue, url);
    },

    skip: async function (message) {

    },

    pause: async function (message) {

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
    if (!voiceChannel) {
        return message.channel.send("Join a voice channel to begin playing music.");
    }
    const permissions = voiceChannel.permissionsFor(message.client.user).toArray();
    if (!permissions.includes("Connect") || !permissions.includes("Speak")) {
        return message.channel.send("Missing connection or speaking privileges for this channel.");
    }

    let serverQueue = queue.get(message.guild.id);
    let songInfo;
    try {
        songInfo = await ytdl.getInfo(url);
    } catch (err) {
        return message.channel.send("Invalid youtube link: " + url);
    }
    console.log(songInfo)
    // console.log(songInfo.videoDetails.video_url)
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };

    if (!serverQueue) {
        const queueStruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
        };

        queue.set(message.guild.id, queueStruct);
        queueStruct.songs.push(song);

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });
        queueStruct.connection = connection;
        playSong(message.guild, queueStruct.songs[0], queue);



    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        return message.channel.send(`${song.title} has been added to the jam sesh !`);
    }

}

async function playSong(guild, song, queue) {
    const serverQueue = queue.get(guild.id);
    if(!song) {
        console.log("balls")
        player.stop();
        queue.delete(guild.id)
        return;
    }

    const stream = await(ytdl(song.url, {filter: 'audioonly'}));
    console.log("here1")
    const resource = createAudioResource(stream);
    // console.log(resource)
    player.play(resource);
    console.log("here2")
    serverQueue.connection.subscribe(player);
    console.log("here3")
    player.on('error', error => {
        console.log(error)
    })
    player.on(AudioPlayerStatus.Playing, () => {
        console.log("Playing");
    })
    player.on(AudioPlayerStatus.Idle, () => {
        serverQueue.songs.shift();
        playSong(guild, serverQueue.songs[0], queue)
    })
    serverQueue.textChannel.send(`Now playing: **${song.title}**`);
}