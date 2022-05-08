/**
 * A template to build commands off of.
 */

const { MessageEmbed, GuildMember } = require('discord.js');
const { GuildMemberManager } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "channeldelete",
    description: "Deletes the current channel. Use at your own risk.",
    arglen: 0,
    argrequired: true,
    execute(message) {
        const embed = new MessageEmbed()
        if (!message.member.permissions.has('MANAGE_CHANNELS')) {
            embed.setTitle('An error has occured!').setDescription('You do not have permission to use this command.');
        } else {
            embed
            .setTitle('Command successfully executed!')
            .setDescription('This channel will be deleted in 5 seconds.');
        setTimeout(() =>  {message.channel.delete()}, 5000);
        }
        return message.channel.send({ embeds: [embed] });
    }
}