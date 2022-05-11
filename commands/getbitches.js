/**
 * A command to get you bitches.
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "getbitches",
    description: "Gets you bitches.",
    arglen: 0,
    argrequired: true,
    execute(message) {
        const embed = new MessageEmbed();
        if (message.member.id === '180875339054972928') {
            embed
                .setTitle('An error has occured!')
                .setDescription('No bitches found.');
        } else {
            embed
                .setTitle('Command successfully executed!')
                .setDescription('You have been granted access to bitches.');
        }
        return message.channel.send({ embeds: [embed] });
    }
}