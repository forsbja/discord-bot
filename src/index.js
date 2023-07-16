const { Client, Events, GatewayIntentBits } = require('discord.js');
const { prefix, token } = require('./config.json');
const trivia = require("./trivia.js")
const rps = require('./rps');
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

client.login(token);

client.once('ready', () => {
    console.log('Bot online!');
});

client.on("messageCreate", (message) => {
    const messArr = message.content.split(' ')
    message.content = message.content.toLowerCase();
    if(message.content.startsWith(prefix) && (!message.author.bot)){
      switch (message.content){
        case "!help":
          message.channel.send("Commands: \n!trivia\n!adventure");
          break;
        case "!ping":
          message.channel.send("pong!");
          break;
        case "!rps":
          rps();
          //message.channel.type === ('"dm"') + message.author.send("Are you ready for Rock Paper Scissors? reply with !yes to begin");
          break;
        case "!trivia":
          trivia.startGame(message);
          break;
        case "!adventure":
          adventure.startAdventure(message, 0);
          break;
        default:
          message.channel.send("Command not recognized");
      }
    }
});

