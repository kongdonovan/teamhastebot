/**
 * calculates love between two users
 * todo: fix edge case of pinging coming up with strange results
 */
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "lovecalculate",
    description: "Calculates the percentage of love between two individuals.",
    args: "<p1> <p2>",
    execute(message) {
        let embed = new MessageEmbed();
        let cmdArray = message.content.split(" ");
        if (cmdArray.length != 3) {
            embed.setTitle('An error has occured!').setDescription('This command accepts 2 arguments. Please run #help lovecalculate for more info.');
            return message.channel.send({ embeds: [embed] });
        }
        let p1Value = calculateValue(cmdArray[1]);
        let p2Value = calculateValue(cmdArray[2]);
        let loveValue = Math.abs((p2Value - p1Value) % 100);
        embed
            .setTitle('The amount of love between ' + cmdArray[1] + ' and ' + cmdArray[2] + ' is ' + loveValue + '%')
            .setDescription('You two were clearly made to be <3');
        return message.channel.send({ embeds: [embed] });
    }
}

function calculateValue(name) {
    let value = 0;
    for (let i = 0; i < name.length; i++) {
      value += name.charCodeAt(i);
    }
    return value;
  }