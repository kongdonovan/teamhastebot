/**
 * calculates love between two users
 * todo: fix edge case of pinging coming up with strange results
 */
const { MessageEmbed } = require('discord.js');
const {prefix} = require('../config.json');
const { loveCalculateArray } = require('./images.json');

module.exports = {
    name: "lovecalculate",
    description: "Calculates the percentage of love between two individuals.",
    args: "<p1> <p2>",
    arglen: 2,
    argrequired: true,
    execute(message) {
        let embed = new MessageEmbed();
        let cmdArray = message.content.split(" ");
        let p1Value = calculateValue(cmdArray[1]);
        let p2Value = calculateValue(cmdArray[2]);
        let loveValue = Math.abs((p2Value - p1Value) % 100);
        embed
            .setTitle('The amount of love between ' + cmdArray[1] + ' and ' + cmdArray[2] + ' is ' + loveValue + '%')
            .setDescription('You two were clearly made to be <3');
        if (loveValue >= 80) {
            embed.setImage(loveCalculateArray[0])
            } else if (loveValue >= 60 && loveValue < 80) {
            embed.setImage(loveCalculateArray[1]);
            } else if (loveValue >= 40 && loveValue < 60) {
            embed.setImage(loveCalculateArray[2]);
            } else if (loveValue >= 20 && loveValue < 40) {
            embed.setImage(loveCalculateArray[3]);
            } else {
            embed.setImage(loveCalculateArray[4]);
            }
        let num = Math.floor(Math.random() * 100);
        if (num === 69) {
            let newEmbed = new MessageEmbed()
                .setTitle('haha funny penis surgery gif')
                .setImage(loveCalculateArray[5])
            return message.channel.send({ embeds: [newEmbed] });
        } else {
            return message.channel.send({ embeds: [embed] });
        }
    }
}

/**
 * sums up each character's ascii value in name and returns the sum
 * @param {String} name the name of a person
 * @returns {int} an integer representing a name's int value
 */
function calculateValue(name) {
    let value = 0;
    for (let i = 0; i < name.length; i++) {
      value += name.charCodeAt(i);
    }
    return value;
}