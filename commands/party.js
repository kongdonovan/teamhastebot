/**
 * This command sends a party gif (unless it's Al Jeffrey).
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');
const { partyImages, noPartyImages } = require('./images.json');

module.exports = {
    name: "party",
    description: "Sends a partying gif",
    arglen: 0,
    argrequired: true,
    execute(message) {
        const embed = new MessageEmbed()
        const alJeffreyId = '180875339054972928'
        const choosePartyGif = partyImages[Math.floor(Math.random() * partyGifs.length)];
        const chooseNoPartyGif = noPartyImages[Math.floor(Math.random() * noPartyGifs.length)];
        const author = message.member.id;

        if (author === alJeffreyId) {
            embed
                .setTitle('sorry, no party time for you :(')
                .setImage(chooseNoPartyGif);
        } else {
            embed
                .setTitle("IT'S PARTY TIME!!!!!!! 🎉🎉🎉")
                .setImage(choosePartyGif);
        }
        return message.channel.send({ embeds: [embed] });
    }
}