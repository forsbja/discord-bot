
run: async(client, message, args) => {
    const botChoice = Math.floor(Math.random() * 2) + 1
    let botEmoji;
    let playerEmoji;
    let botChoiceStr;

    if (!args[0]) return message.channel.send('Please pick an option, rock, paper, or scissors.');
    if (!['rock', 'paper', 'scissors'].includes(args[0])) return message.channel.send('invalid option, please pick rock, paper, or scissors.');
    if (botChoice == 1) {
        botChoiceStr = 'rock';
        botEmoji = ':rock: Rock';
    }
    if (botChoice == 2) {
        botChoiceStr = 'paper';
        botEmoji = ':newspaper: Paper';
    }
    if (botChoice == 3) {
        botChoiceStr = 'scissors';
        botEmoji = ':scissors: Scissors';
    }

    if (args[0] == 'rock') playerEmoji = ':rock: Rock';
    if (args[0] == 'paper') playeEmoji = ':newspaper: Paper';
    if (args[0] == 'scissors') playerEmoji = ':scissors: Scissors';

    if (botChoiceStr == args[0]) return message.channel.send('Buster picked: ${botEmoji}, you picked: ${playerEmoji}. We Tied!');
    if (args[0] == 'rock') {
        if (botChoiceStr == 'paper') return message.channel.send('Buster picked: ${botEmoji}, you picked: ${playerEmoji}. You Lost!');
        else return message.channel.send('Buster picked:${botEmoji}, you picked: ${playerEmoji}. You Won!');
    }
    if (args[0] == 'paper') {
        if (botChoiceStr == 'scissors') return message.channel.send('Buster picked: ${botEmoji}, you picked: ${playerEmoji}. You Lost!');
        else return message.channel.send('Buster picked:${botEmoji}, you picked: ${playerEmoji}. You Won!');
    }
    if (args[0] == 'scissors') {
        if (botChoiceStr == 'rock') return message.channel.send('Buster picked: ${botEmoji}, you picked: ${playerEmoji}. You Lost!');
        else return message.channel.send('Buster picked:${botEmoji}, you picked: ${playerEmoji}. You Won!');
    }
} 
