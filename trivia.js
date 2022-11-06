const fetch = require('node-fetch');

module.exports = {
    
    startGame: async function(message) {

        let currChannel = message.channel;
          if(message.author.bot){return;}

          //Initialize Vars
            const response = await fetch('https://opentdb.com/api.php?amount=10');
            const data = await response.json();
            var length = data.results.length;
            var randomNumber = Math.floor(Math.random() * length);
            var randomQuestion = data.results[randomNumber];
            var question = decodeEntities(randomQuestion.question);
            var correctAnswer = decodeEntities(randomQuestion.correct_answer);
            var numAnswers = randomQuestion.incorrect_answers.length + 1;
            var answerPos = Math.floor(Math.random() * numAnswers);
            var choices = new Array(numAnswers);
            for(let i = 0, j = 0; i < choices.length; i++){
              if(i == answerPos){
                choices[i] = correctAnswer;
              }else{
                choices[i] = decodeEntities(randomQuestion.incorrect_answers[j]);
                j++;
              }
            }

            //Arrange possible answers into a single array
            var questionChoices;
            if(numAnswers == 4){ //Multiple choice
              questionChoices = question + "\nA: "+choices[0]+"\nB: "+choices[1]+"\nC: "+choices[2]+"\nD: "+choices[3];
            }else{ //True or false
              questionChoices = question + "\nTrue\nFalse";
            }

            //Debug
            console.log(randomQuestion);
            console.log("Num of options: "+ numAnswers);
            console.log("Correct position: "+ answerPos);
            console.log("Correct answer: "+ correctAnswer);
            
            //Send Question / Receive Answer
            message.channel.send(questionChoices);

            const filter = m => !m.author.bot;
            const answer = await currChannel.awaitMessages({filter, max: 1, time: 15000})
            const ans = answer.first();

            //Answer Checking
            if(ans == null){
              currChannel.send("Out of time! The answer was: " + correctAnswer);
              console.log("User failed to answer")
              return;
            }

            console.log("User answered: " + ans.content);
            
            let correct = false;
            if(numAnswers == 4){
              switch(ans.content){
                case "a":
                  if(choices[0] === correctAnswer){
                    correct = true;
                  }
                  break;
                case "b":
                  if(choices[1] === correctAnswer){
                    correct = true;
                  }
                  break;
                case "c":
                  if(choices[2] === correctAnswer){
                    correct = true;
                  }
                  break;
                case "d":
                  if(choices[3] === correctAnswer){
                    correct = true;
                  }
                  break;
              }
          }else{
            if(ans.content == correctAnswer.toLowerCase()){
              correct = true;
            }
          }

          //Return if the user got the question right
          if(correct){
            currChannel.send("Correct!");
          }else{
            currChannel.send("Incorrect, the answer was: " + correctAnswer);
          }
    }
    
}

function decodeEntities(encodedString) {
  var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  var translate = {
      "nbsp":" ",
      "amp" : "&",
      "quot": "\"",
      "lt"  : "<",
      "gt"  : ">",
      "eacute": "é"
  };
  return encodedString.replace(translate_re, function(match, entity) {
      return translate[entity];
  }).replace(/&#(\d+);/gi, function(match, numStr) {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
  });
}

