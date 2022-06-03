/**
 * Allows a user to delete channels. Only works if they have the proper permissions.
 */

const { MessageEmbed, GuildMember, ReactionManager } = require('discord.js');
const { GuildMemberManager } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "deletechannel",
    category: "utility",
    description: "Deletes the current channel. Use at your own risk.",
    arglen: 0,
    argrequired: true,
    execute(message) {
        const message_id = message.channelId;
        const embed = new MessageEmbed()
        if (!message.member.permissions.has('MANAGE_CHANNELS')) {
            embed.setTitle('An error has occured!').setDescription('You do not have permission to use this command.');
        } else {
            embed
            .setTitle('Are you sure you want to delete this channel?')
            .setDescription('You have 15 seconds type "yes" or "no", case sensitive. This action cannot be undone.');
        }
        message.channel.send({ embeds: [embed] });
        const dateExecuted = Date.now();
        const client = message.client;
        let isDeleted = false;
        let timerId = null;
        client.on("messageCreate", message => {
            const newEmbed = new MessageEmbed();
            if (isDeleted && message.content !== "abort") {
                return;
            } else if (message.content === "abort" && message.channelId === message_id) {
                console.log(timerId);
                clearTimeout(timerId);
                newEmbed
                .setTitle('Command successfully aborted!')
                .setDescription('This channel will not be deleted.');
                return message.channel.send({embeds: [newEmbed]});
            }
            if (message.content === "yes" && message.channelId === message_id) {
                isDeleted = true;
                newEmbed
                    .setTitle('Command successfully executed!')
                    .setDescription('This channel will be deleted in 5 seconds. If you change your mind, you can type "abort"');
                timerId = setTimeout(deleteChannel, 5000, message.channel);
                return message.channel.send({embeds: [newEmbed]});
            } else if (message.content === "no" && message.channelId === message_id) {
                newEmbed
                .setTitle('Command successfully aborted!')
                .setDescription('This channel will not be deleted.');
                return message.channel.send({embeds: [newEmbed]});
            } else if (Date.now() - dateExecuted >= 15000) {
                return;
            }
        })

        function deleteChannel(channel) {
            channel.delete();
        }
    }
}