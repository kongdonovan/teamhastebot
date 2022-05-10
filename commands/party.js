/**
 * This command sends a party gif (unless it's Al Jeffrey).
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "party",
    description: "Sends a partying gif",
    arglen: 0,
    argrequired: true,
    execute(message) {
        const embed = new MessageEmbed()
        const partyGifs = ['./img/dancing-cat.gif', './img/puppet-dance.gif', './img/yakuza.gif']
        const noPartyGif = './img/sad-frown.gif'
        const alJeffreyId = '180875339054972928'
        const partyGif = partyGifs[Math.floor(Math.random() * partyGifs.length)];
        const author = message.member.id;

        if (author === alJeffreyId) {
            embed
                .setTitle('sorry, no party time for you :(')
                .setImage(noPartyGif);
        } else {
            embed
                .setTitle("IT'S PARTY TIME!!!!!!! 🎉🎉🎉")
                .setImage(partyGif);
        }
        return message.channel.send({ embeds: [embed] });
    }
}