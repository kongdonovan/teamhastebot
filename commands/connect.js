/**
 * A template to build commands off of.
 */

const { MessageEmbed, MessageFlags } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');
const { joinVoiceChannel, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
    name: "connect",
    description: "Connects the bot to the current voice channel you're in.",
    arglen: 0,
    argrequired: true,
    execute(message) {
        if (!message.member.voice.channelId) {
            const embed = new MessageEmbed()
                .setTitle('An error has occured!')
                .setDescription('You are not currently connected to a voice channel!');
            return message.channel.send({embeds: [embed]});
        }
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channelId,
            guildId: message.guildId,
            adapterCreator: message.member.voice.guild.voiceAdapterCreator,
        })

        connection.on(VoiceConnectionStatus.Ready, () => {
            console.log('The connection has entered the Ready state - ready to play audio!');
        });

        const embed = new MessageEmbed()
            .setDescription('Successfully connected!');
        return message.channel.send({embeds: [embed]});
    }
}