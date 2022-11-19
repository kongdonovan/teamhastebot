/**
 * This command allows two users to fight and determines who wins.
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');
const { fightGifs } = require('./images.json');

module.exports = {
    name: "fight",
    category: "fun",
    description: "Determines who wins the fight",
    args: "<p1> <p2>",
    arglen: 2,
    argrequired: true,
    execute(message) {
        let cmdArray = message.content.split(" ");

        if (cmdArray[1] === "al-jeffrey") {
            
        }
        const randNum = cmdArray[1] === "al-jeffrey" ? 2 : cmdArray[2] === "al-jeffrey" ? 1 : Math.floor(Math.random() * 2) + 1;

        const chooseFightGif = fightGifs[Math.floor(Math.random() * fightGifs.length)];
        const embed = new MessageEmbed()
            .setTitle(cmdArray[randNum] + " WINS!!!")
            .setImage(chooseFightGif);
        return message.channel.send({ embeds: [embed] });
    }
}