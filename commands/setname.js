/**
 * A template to build commands off of.
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "setname",
    category: "admin",
    description: "Changes the bot's profile picture.",
    args: "<user> <name>",
    arglen: -1,
    argrequired: true,
    execute(message) {
        let name = message.content.split(" ");
        let str = "";
        for (let i = 2; i < name.length; i++) {
            str += name[i] + " ";
        }
        str = str.trim();
        let user = message.mentions.members.first();
        user.setNickname(str);
        const embed = new MessageEmbed()
            .setTitle('Command successfully executed!')
            .setDescription('Nickname has been changed.');
        return message.channel.send({ embeds: [embed] });
    }
}