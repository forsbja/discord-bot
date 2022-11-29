const fs = require('fs');

module.exports = {
    
    startAdventure: async function(message, index) {
        if(message.author.bot){return;} //Ensure a bot didn't trigger this
        //Read in JSON File to a variable
        let rawData = fs.readFileSync('scenarios.json');
        let scenarios = JSON.parse(rawData);

        //Keep all responses to this in the same file and to the same user
        let currChannel = message.channel;
        let player = message.author;
        
        //Set up scenario vars
        var currScenario = scenarios[0];
        var choices = currScenario.choices;
        let transPrompt = "";

        //Send first scenario
        let scenarioPrompt = formPrompt(currScenario.lore,choices);
        message.channel.send(scenarioPrompt);
        
        //Loop for as long as the game runs
        while(true){
            //Grab Answer
            const filter = m => !m.author.bot && m.author == player && (m.content == 1 || m.content == 2 || m.content == 3);
            const answer = await currChannel.awaitMessages({filter, max: 1, time: 60000})
            const ans = answer.first();

            //Handle user taking too long and exit the game
            if(ans == null){
                await currChannel.send("Oh no! You waited so long to choose you died of old age :) !");
                console.log("User failed to answer")
                return;
            }
            console.log("Player answered: " + ans.content);

            //Add a transition statement from the last choice to the next scenario
            transPrompt = await currScenario.choiceTransition[ans.content-1] + " ";
            console.log(transPrompt);
           
            //Set Scenario to next one and update choices
            currScenario = await scenarios[currScenario.nextScenario[ans.content-1]];
            choices = await currScenario.choices;

            //Check to see if they chose poorly, exit the game if true
            if(currScenario.ending){
                currChannel.send(transPrompt + " " + currScenario.lore);
                currChannel.send("Your adventure has ended.");
                return;
            }

            //Compose message for next scenario and send it
            scenarioPrompt = transPrompt.concat(formPrompt(currScenario.lore,choices));
            await message.channel.send(scenarioPrompt);
            console.log(currScenario);
        }
    }
    
}





/**
 * 
 * @param {*} lore 
 * @param {*} choices 
 * @returns 
 */
function formPrompt(lore, choices){
    let scenarioPrompt = lore + "\n\nDo you..." + "\n1: "+choices[0]+"\n2: "+choices[1]+"\n3: "+choices[2];
    return scenarioPrompt;
}