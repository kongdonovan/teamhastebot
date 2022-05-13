/**
 * Displays Donovan's venmo
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "donate",
    category: "fun",
    description: "Shows ways to donate to Donovan",
    arglen: 0,
    argrequired: true,
    execute(message) {
        const embed = new MessageEmbed()
            .setTitle('pls donate to donovan 🥺')
            .setDescription('you can venmo me @kongdonovan');
        return message.channel.send({ embeds: [embed] });
    }
}