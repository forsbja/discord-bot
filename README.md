# Discord Bot
## Set Up
To use this bot clone the repository. Then create a new bot on the discord developer portal. Then create a config.json file in the resources directory with the following format:
```
{
  "prefix": "[prefix to trigger the bot]",
  "token": "[token from discord portal]"
}
```
### Using Docker

### Running Normally
First run the following to install all necessary dependencies:
```
$ npm install
``` 
Then to start the bot use:
```
$ npm start
```
## Supported Commands
!help ~ lists all current commands with a description <br>
!trivia ~ asks you a trivia question <br>
!adventure ~ Creates an rpg game with multiple endings <br>
TBD - !play ~ plays a song on the bot in a voice channel
