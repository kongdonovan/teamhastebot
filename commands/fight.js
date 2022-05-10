/**
 * This command allows two users to fight and determines who wins.
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "fight",
    description: "Determines who wins the fight",
    args: "<p1> <p2>",
    arglen: 2,
    argrequired: true,
    execute(message) {
        let cmdArray = message.content.split(" ");
        const randNum = Math.random() + 1
        const fightGifs = ['https://c.tenor.com/wRn7QgE40FEAAAAC/dog-cat.gif', 'https://c.tenor.com/5iVv64OjO28AAAAC/milk-and-mocha-bear-couple.gif', 'https://c.tenor.com/TPDruIOzoEkAAAAd/kitten-smol.gif']
        const chooseFightGif = fightGifs[Math.floor(Math.random() * fightGifs.length)];
        const embed = new MessageEmbed()
            .setTitle(cmdArray[randNum] + " WINS!!!")
            .setImage(chooseFightGif);
        return message.channel.send({ embeds: [embed] });
    }
}