# Discord Bot
## Set Up
To use this bot clone the repository. Then create a new bot on the discord developer portal. Then create a config.json file with the special token discord gives you under the variable name token.
### Using Docker
First create the docker image:
```
$ docker build . -t discordbot
```
To run it, use the following command:
```
$ docker run --name [name] -d -p 8080:8080 discordbot
```
You can then stop and start using:
```
$ docker stop [name]
$ docker start [name]
```
You can kill the container using:
```
$ docker kill [name]
```
This will likely be changed to a script to streamline the process at a later date.
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
