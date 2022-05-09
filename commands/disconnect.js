/**
 * A template to build commands off of.
 */

const { MessageEmbed, MessageFlags } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: "disconnect",
    description: "Disconnects the bot from any voice channels.",
    arglen: 0,
    argrequired: true,
    async execute(message) {
        const connection = await getVoiceConnection(message.guildId);
        console.log(connection);
        if (!connection) {
            const embed = new MessageEmbed()
                .setTitle('An error has occured!')
                .setDescription('The bot is already disconnected!');
            return message.channel.send({embeds: [embed]});
        }
        connection.destroy();
        const embed = new MessageEmbed()
            .setDescription('Successfully disconnected!');
        return message.channel.send({embeds: [embed]});
    }
}