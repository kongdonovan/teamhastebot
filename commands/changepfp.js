/**
 * A template to build commands off of.
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "changepfp",
    description: "Changes the bot's profile picture.",
    args: "<url>",
    arglen: 1,
    argrequired: true,
    execute(message) {
        let cmdArray = message.content.split(" ");
        let client = message.client.user;
        client.setAvatar(cmdArray[1]);
        const embed = new MessageEmbed()
            .setTitle('Command successfully executed!')
            .setDescription('Profile picture has been changed.');
        return message.channel.send({ embeds: [embed] });
    }
}