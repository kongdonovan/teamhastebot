/**
 * A template to build commands off of.
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "ban",
    category: "admin",
    description: "Bans a user from the server.",
    args: '<user>',
    arglen: 1,
    argrequired: true,
    execute(message) {
        const embed = new MessageEmbed();
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            embed.setTitle('An error has occured!').setDescription('You do not have permission to use this command.');
        } else if (!message.mentions.members.first()) {
            embed.setTitle('An error has occured!').setDescription('Please ping a user in order to use this command!');
        } else if (!message.mentions.members.first().bannable) {
            embed.setTitle('An error has occured!').setDescription(message.mentions.members.first().user.tag + ' is unable to be banned by HasteBot.');
        } else {
            let userToKick = message.mentions.members.first();
            userToKick.ban({reason: 'Automatically banned by HasteBot.'});
            embed
                .setTitle('User successfully banned!')
                .setDescription(userToKick.user.tag + ' has been banned.');
        }
        return message.channel.send({ embeds: [embed] });
    }
}