/**
 * A template to build commands off of.
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "kick",
    category: "admin",
    description: "Kicks a user from the server.",
    args: '<user>',
    arglen: 1,
    argrequired: true,
    execute(message) {
        const embed = new MessageEmbed();
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            embed.setTitle('An error has occured!').setDescription('You do not have permission to use this command.');
        } else if (!message.mentions.members.first()) {
            embed.setTitle('An error has occured!').setDescription('Please ping a user in order to use this command!');
        } else if (!message.mentions.members.first().kickable) {
            embed.setTitle('An error has occured!').setDescription(message.mentions.members.first().user.tag + ' is unable to be kicked by HasteBot.');
        } else {
            let userToKick = message.mentions.members.first();
            userToKick.kick('Automatically kicked by HasteBot.');
            embed
                .setTitle('User successfully kicked!')
                .setDescription(userToKick.user.tag + ' has been kicked.');
        }
        return message.channel.send({ embeds: [embed] });
    }
}