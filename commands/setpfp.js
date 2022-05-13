/**
 * A template to build commands off of.
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "setpfp",
    category: "admin",
    description: "Changes the bot's profile picture.",
    args: "<url>",
    arglen: 1,
    argrequired: true,
    execute(message) {
        const defaultPfp = "https://cdn.discordapp.com/attachments/289199473941413900/897266151439073300/team_haste.JPG";
        let cmdArray = message.content.split(" ");
        let client = message.client.user;
        if (cmdArray[1] === "default") {
            client.setAvatar(defaultPfp);
        } else {
            client.setAvatar(cmdArray[1]);
        }
        const embed = new MessageEmbed()
            .setTitle('Command successfully executed!')
            .setDescription('Profile picture has been changed.');
        return message.channel.send({ embeds: [embed] });
    }
}