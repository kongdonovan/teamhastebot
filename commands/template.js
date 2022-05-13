/**
 * A template to build commands off of.
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "commandname",
    category: "categoryhere",
    description: "commanddescription",
    args: "", // leave blank for no args
    arglen: 0, // set to -1 for infinite args
    argrequired: true,
    execute(message) {
        const embed = new MessageEmbed()
            .setTitle('Command successfully executed!')
            .setDescription('This channel will be deleted in 5 seconds.');
        return message.channel.send({ embeds: [embed] });
    }
}