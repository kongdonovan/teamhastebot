/**
 * A template to build commands off of.
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "commandname",
    description: "commanddescription",
    arglen: 0,
    argrequired: true,
    execute(message) {
        const embed = new MessageEmbed()
            .setTitle('Command successfully executed!')
            .setDescription('This channel will be deleted in 5 seconds.');
        return message.channel.send({ embeds: [embed] });
    }
}