const { Client, Events, GatewayIntentBits } = require('discord.js');
const { prefix, token } = require('../resources/config.json');
const trivia = require("./trivia.js")
const adventure = require('./adventure');
const music = require('./music');


const client = new Client({
  intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
  ]
})

// Bot Startup
client.login(token);
client.once('ready', () => {
    console.log('Bot online!');
});

// Map of music queues with servers
const queue = new Map();

client.on("messageCreate", (message) => {
    const messArr = message.content.split(' ')
    if(messArr[0].startsWith(prefix) && (!message.author.bot)){
      switch (messArr[0].toLowerCase()){
        case `${prefix}help`:
          message.channel.send("Commands: \n!trivia\n!adventure");
          break;
        case `${prefix}ping`:
          message.channel.send("pong!");
          break;
        case `${prefix}trivia`:
          trivia.startGame(message);
          break;
        case `${prefix}adventure`:
          adventure.startAdventure(message);
          break;
        case `${prefix}play`:
          music.play(message, queue, messArr[1])
          break;
        default:
          message.channel.send("Command not recognized");
      }
    }
});

