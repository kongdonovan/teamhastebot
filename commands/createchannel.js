/**
 * A template to build commands off of.
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "createchannel",
    category: "utility",
    description: "Creates a channel in the current category you are in.",
    args: "<channelname>",
    arglen: 1,
    argrequired: true,
    async execute(message) {
        let cmdArray = message.content.split(" ")[1];
        var channelUrlBase = 'https://discord.com/channels/'
        let newChannel = await message.channel.parent.createChannel(cmdArray, {});
        channelUrlBase += newChannel.guildId + '/' + newChannel.id;
        const embed = new MessageEmbed()
            .setTitle('Successfully created!')
            .setDescription('You can find your channel [here](' + channelUrlBase + ') or at the bottom of the category.');
        return message.channel.send({ embeds: [embed] });
    }
}